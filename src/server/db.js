const spicedPg = require("spiced-pg");
const secrets = require("../../secrets");
const dbUrl = secrets.DATABASE_URL;

const db = spicedPg(dbUrl);
const bcrypt = require("bcryptjs");

const hash = (password) => {
    return bcrypt.genSalt().then((salt) => {
        return bcrypt.hash(password, salt);
    });
};
// -----------------------------------------------------------------register and login user-----------------------------
module.exports.addUser = (name, email, password) => {
    return hash(password)
        .then((password_hash) => {
            return db.query(
                `INSERT INTO users(name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING * `,
                [name, email, password_hash]
            );
        })
        .then((result) => {
            return result.rows[0];
        });
};

module.exports.verifyUser = (email, password) => {
    return db
        .query("SELECT * FROM users where email = $1", [email])
        .then((result) => {
            // will be true if there are nor rows
            if (!result.rows.length) {
                throw new Error(
                    "No user with this email exists. Please register!"
                );
            }
            return Promise.all([
                bcrypt.compare(password, result.rows[0].password_hash),
                // we have to return the user info, so we can access it in the next promise
                result.rows[0],
            ]);
        })
        .then(([isPasswordMatch, userInfo]) => {
            if (!isPasswordMatch) {
                throw new Error("Your password was incorrect.");
            }
            return userInfo;
        });
};

module.exports.getUserById = (id) => {
    return db
        .query(
            `
    SELECT id, name,email,tasks_per_week FROM users
    WHERE id =$1 `,
            [id]
        )
        .then((result) => {
            if (!result.rows.length) {
                throw new Error(
                    "No user with this email exists. Please register!"
                );
            }
            return result.rows[0];
        });
};

// --------------------------------------------------------------------------------delete user--------------------------------

module.exports.deleteUser = (user_id) => {
    return db.query(
        `DELETE FROM users 
        WHERE id=$1
        `,
        [user_id]
    );
};
// ------------------------------------------------------------------------customise plan--------------------------------------

module.exports.updateTaskCount = (taskCount, id) => {
    return db.query(
        `UPDATE users
        SET   tasks_per_week= $1
        WHERE id =$2`,
        [taskCount, id]
    );
};

module.exports.addRoom = (type, name, user_id) => {
    return db.query(
        `
    INSERT INTO rooms(type,name, user_id)
    VALUES($1,$2,$3)
    `,
        [type, name, user_id]
    );
};

module.exports.deleteRoom = (room_id) => {
    return db.query(
        `
        DELETE FROM rooms
        WHERE room_id=$1
        `,
        [room_id]
    );
};

module.exports.updateRoom = (room) => {
    return db.query(
        `
        UPDATE rooms
        SET type = $1, name=$2
        WHERE room_id=$3
         `,
        [room.type, room.name, room.room_id]
    );
};
module.exports.getRoomsByUserId = (user_id) => {
    return db
        .query(
            `SELECT * FROM rooms
        WHERE user_id = $1
        ORDER BY room_id`,
            [user_id]
        )
        .then((result) => {
            return result.rows;
        });
};
//---------------------------------------------------------------------------tasks------------------------------------

module.exports.getRecentlyCompletedTasks = (user_id) => {
    return db
        .query(
            `SELECT * FROM tasks
        WHERE user_id=$1
         AND completed_at > NOW() - interval '3 months'`,
            [user_id]
        )
        .then((result) => {
            return result.rows;
        });
};

module.exports.addTask = (user_id, type, description, room_id) => {
    return db
        .query(
            `
    INSERT INTO tasks (user_id, type, description, room_id)
    VALUES($1,$2,$3,$4)
    RETURNING *`,
            [user_id, type, description, room_id]
        )
        .then((result) => {
            return result.rows[0];
        });
};

module.exports.getWeeklyTasks = (user_id) => {
    return db
        .query(
            `
    SELECT * FROM tasks
    WHERE user_id=$1
    AND created_at > NOW() - interval '7 days'
    
    ORDER BY task_id`,
            [user_id]
        )
        .then((result) => {
            return result.rows;
        });
};

module.exports.completeTask = (task_id) => {
    return db
        .query(
            `
    UPDATE tasks
    SET completed_at = NOW()
    WHERE task_id =$1
    RETURNING * `,
            [task_id]
        )
        .then((result) => {
            return result.rows[0];
        });
};

module.exports.incompleteTask = (task_id) => {
    return db
        .query(
            `
    UPDATE tasks
    SET completed_at = NULL
    WHERE task_id =$1
    RETURNING * `,
            [task_id]
        )
        .then((result) => {
            return result.rows[0];
        });
};

// ----------------------------------------------------------------------------------------reset password-----------------------------

module.exports.verifyUserByEmail = (email) => {
    return db
        .query("SELECT * FROM users where email = $1", [email])
        .then((result) => {
            // will be true if there are nor rows
            if (!result.rows.length) {
                throw new Error(
                    "No user with this email exists. Please register!"
                );
            }
            return result.rows[0].email;
        });
};

module.exports.addCodeToUser = (email, code) => {
    return db.query(
        `INSERT INTO reset_codes(email,code)
        VALUES ($1, $2) 
        RETURNING * `,
        [email, code]
    );
};

module.exports.getEmailByResetCode = (code) => {
    return db
        .query(
            `SELECT email FROM reset_codes
    WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    AND code = $1
     `,
            [code]
        )
        .then((result) => {
            // will be true if there are nor rows
            if (!result.rows.length) {
                throw new Error(
                    "Your code is invalid or expired!Please rquest a new code."
                );
            }
            return result.rows[0].email;
        });
};

module.exports.updatePasswordByEmail = (password, email) => {
    return hash(password).then((password_hash) => {
        return db.query(
            `UPDATE users
                SET password_hash= $1
                WHERE email=$2`,
            [password_hash, email]
        );
    });
};
