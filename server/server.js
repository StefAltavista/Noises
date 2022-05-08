const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const user = require("./user.js");
const cookieSession = require("cookie-session");
const { checkRegistration } = require("./middleware.js");
app.use(
    cookieSession({
        secret: `MaskingTheCookieWithThisString`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);
let exists;

//compressing the response .
app.use(compression());
//use json middleware for every request
app.use(express.json());
//connect to public
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/user/id.json", (req, res) => {
    res.json({
        userId: req.session.userId,
    });
});
app.post("/register", checkRegistration, (req, res) => {
    console.log("Request body:", req.body);
    user.neu(req).then(({ e, id, init }) => {
        if (e) {
            res.json({ e, id: null });
        } else {
            req.session.userId = id;
            res.json({ e: null, id: init });
        }
    });
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("on 3001");
});
