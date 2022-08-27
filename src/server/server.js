const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const server = require("http").Server(app);
const cookieSession = require("cookie-session");
const db = require("./db");
const config = require("./config");
const { enrichRoomsWithTasks, getAllPossibleTasks } = require("./tasks");
const aws = require("aws-sdk");
const cryptoRandomString = require("crypto-random-string");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../../secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-central-1", // Make sure this corresponds to the region in which you have verified your email address (or 'eu-west-1' if you are using the Spiced credentials)
});

const cookieSessionMiddleware = cookieSession({
    //random string input for secret; the longer the better(normally shouldnt be in a public place like github)
    secret: secrets.SESSION_SECRET,
    //milliseconds times seconds times minutes times hours times days => two weeks in milliseconds
    maxAge: 1000 * 60 * 60 * 24 * 14,
});

app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "..", "public")));
app.use(cookieSessionMiddleware);

app.get("/api/users/me", (req, res) => {
    if (!req.session.userId) {
        res.json({
            isLoggedIn: false,
        });
        return;
    }
    db.getUserById(req.session.userId)
        .then((user) => {
            res.json({
                isLoggedIn: true,
                user,
            });
        })
        .catch((err) => {
            console.log(err, "User info couldn't be retrieved.");
            res.json({
                isLoggedIn: false,
            });
        });
});

// -----------------------------------------------------------register and login users-----------------------------------
app.post("/api/register", (req, res) => {
    if (typeof req.session.userId !== "undefined") {
        res.status(400).json({
            success: false,
            error: "User is already logged in. Please log out to register a new account.",
        });
        return;
    }
    const { name, email, password } = req.body;

    // insert new user into db
    db.addUser(name, email, password)
        .then((user) => {
            req.session.userId = user.id;
            res.json({ success: true });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        });
});
app.post("/api/login", (req, res) => {
    if (typeof req.session.userId !== "undefined") {
        res.status(400).json({
            success: false,
            error: "User is already logged in. Please log out to register a new account.",
        });
        return;
    }
    const { email, password } = req.body;

    db.verifyUser(email, password)
        .then((userInfo) => {
            req.session.userId = userInfo.id;
            res.json({ success: true });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        });
});

app.get("/logout", (req, res) => {
    req.session.userId = undefined;
    res.redirect("/");
});

// ---------------------------------------------------------------------------customise plan--------------------------

app.post("/api/plan", (req, res) => {
    if (typeof req.session.userId === "undefined") {
        res.status(401).json({
            success: false,
            error: "Please log in first.",
        });
        return;
    }
    const { rooms, taskCount } = req.body;

    db.getRoomsByUserId(req.session.userId)
        .then((existingRooms) => {
            //  need to figure out whether room needs to be deleted, inserted or updated
            const roomsToAdd = rooms.filter((room) => !room.room_id);
            const roomsToUpdate = rooms.filter((room) => room.room_id);
            const roomsToDelete = existingRooms.filter((existingRoom) => {
                // if we don't find a room in the payload given to us by the client, we can delete the room
                return !rooms.find(
                    (room) => room.room_id === existingRoom.room_id
                );
            });

            // each room is turned into a promise, which adds each single room to the database
            return Promise.all([
                db.updateTaskCount(taskCount, req.session.userId),
                ...roomsToAdd.map((r) =>
                    db.addRoom(r.type, r.name, req.session.userId)
                ),
                ...roomsToUpdate.map((r) => db.updateRoom(r)),
                ...roomsToDelete.map((r) => db.deleteRoom(r.room_id)),
            ]);
        })
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        });
});

app.get("/api/plan/rooms", (req, res) => {
    if (typeof req.session.userId === "undefined") {
        res.status(401).json({
            success: false,
            error: "Please log in first.",
        });
        return;
    }

    db.getRoomsByUserId(req.session.userId)
        .then((rooms) => {
            res.json({ rooms, success: true });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        });
});

// ---------------------------------------------------------------------------assign tasks-------------------------------

app.post("/api/tasks", (req, res) => {
    if (typeof req.session.userId === "undefined") {
        res.status(401).json({
            success: false,
            error: "Please log in first.",
        });
        return;
    }

    // algorithm to randomise and assign tasks:
    // fetch users tasks for the last 3 months
    // group all tasks based on rooms, check if tasks have been completed already, if so deduct each completion from the frequency number,
    // sort tasks based on remaining frequency
    // select first X amount of tasks from list, where X= tasks per week as selected by user
    // insert X tasks into task table in database and return tasks as response
    Promise.all([
        db.getRecentlyCompletedTasks(req.session.userId),
        db.getRoomsByUserId(req.session.userId),
        db.getUserById(req.session.userId),
    ])
        .then(([completedTasks, rooms, user]) => {
            //   updatedTaskFrequency will need to be updated in database
            const updatedTaskFrequencyArr = getAllPossibleTasks(
                rooms,
                completedTasks
            );
            const number = user.tasks_per_week;
            const tasksToAdd = updatedTaskFrequencyArr.slice(0, number);
            return Promise.all(
                tasksToAdd.map((task) => {
                    return db.addTask(
                        req.session.userId,
                        task.type,
                        task.description,
                        task.room_id
                    );
                })
            );
        })
        .then((tasks) => {
            res.json({ success: true, tasks });
        });
});

app.get("/api/tasks/weekly", (req, res) => {
    if (typeof req.session.userId === "undefined") {
        res.status(401).json({
            success: false,
            error: "Please log in first.",
        });
        return;
    }
    db.getWeeklyTasks(req.session.userId).then((tasks) => {
        res.json({ tasks });
    });
});
// --------------------------------------------------------------------------------------------complete tasks-----------------------

app.post("/api/tasks/completed", (req, res) => {
    db.completeTask(req.body.task_id)
        .then((task) => {
            res.json({ success: true, task });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        });
});

app.post("/api/tasks/incompleted", (req, res) => {
    db.incompleteTask(req.body.task_id)
        .then((task) => {
            res.json({ success: true, task });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        });
});

// -------------------------------------------------------------------------------reset password-----------------------------------

app.post("/api/reset-password", (req, res) => {
    const { email } = req.body;
    const secretCode = cryptoRandomString({
        length: 6,
    });
    db.verifyUserByEmail(email)
        .then((email) => {
            return db.addCodeToUser(email, secretCode);
        })
        .then(() => {
            return ses
                .sendEmail({
                    Source: "Coffeenados <katha.kiehn@gmail.com>",
                    Destination: {
                        ToAddresses: [email],
                    },
                    Message: {
                        Body: {
                            Text: {
                                Data: `Please enter this code ${secretCode} on our webpage!`,
                            },
                        },
                        Subject: {
                            Data: "Reset Password",
                        },
                    },
                })
                .promise();
        })
        .then(() => {
            res.json({
                success: true,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        });
});

app.post("/api/secret-code", (req, res) => {
    const { code, password } = req.body;

    db.getEmailByResetCode(code)
        .then((email) => {
            return db.updatePasswordByEmail(password, email);
        })
        .then(() => {
            res.json({
                success: true,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                error: err.message,
            });
        });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
