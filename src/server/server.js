const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const server = require("http").Server(app);

app.use(compression());
app.use(express.json());
app.use(
    express.static(
        path.join(__dirname, "..", "..", "build", "client", "public")
    )
);

app.get("/api/users/me", (req, res) => {
    res.json({
        isLoggedIn: false,
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
