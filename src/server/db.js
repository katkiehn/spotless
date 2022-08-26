const spicedPg = require("spiced-pg");
const dbUrl =
    process.env.DATABASE_URL ||
    "postgres://postgres:postgres@localhost:5432/spotless";
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

module.exports.getRoomsByUserId = (user_id) => {
    return db
        .query(
            `SELECT * FROM rooms
        WHERE user_id = $1`,
            [user_id]
        )
        .then((result) => {
            return result.rows;
        });
};
