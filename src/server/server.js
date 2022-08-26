const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const server = require("http").Server(app);
const cookieSession = require("cookie-session");
const db = require("./db");
const config = require("./config");


let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../../secrets"); // in dev they are in secrets.json which is listed in .gitignore
}
const cookieSessionMiddleware = cookieSession({
    //random string input for secret; the longer the better(normally shouldnt be in a public place like github)
    secret: secrets.SESSION_SECRET,
    //milliseconds times seconds times minutes times hours times days => two weeks in milliseconds
    maxAge: 1000 * 60 * 60 * 24 * 14,
});

app.use(compression());
app.use(express.json());
app.use(
    express.static(
        path.join(__dirname, "..", "..", "build", "client", "public")
    )
);
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
    res.redirect("/login");
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
    // each room is turned into a promise, which adds each single room to the database
    Promise.all([
        db.updateTaskCount(taskCount, req.session.userId),
        ...rooms.map((r) => db.addRoom(r.type, r.name, req.session.userId)),
    ])
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
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
