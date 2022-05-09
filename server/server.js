const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const user = require("./user.js");
const cookieSession = require("cookie-session");
const { sendCode } = require("./SES.js");
const { checkRegistration } = require("./middleware.js");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("cryptingKey");
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

app.get("/user/verification", (req, res) => {
    res.json({
        verified: req.session.verified,
        email: req.session.email,
    });
});
app.get("/user/clearVerification", (req, res) => {
    req.session = null;
    res.json({ ok: "ok" });
});

app.post("/register", checkRegistration, (req, res) => {
    user.signin(req).then(({ e, id, init }) => {
        if (e) {
            res.json({ e, id: null });
        } else {
            req.session.userId = id;
            res.json({ e: null, id: init });
        }
    });
});
app.post("/login", (req, res) => {
    user.login(req).then(({ e, id, init }) => {
        if (e) {
            res.json({ e, id: null });
        } else {
            req.session.userId = id;
            res.json({ e, id: init });
        }
    });
});

app.post("/api/password", (req, res) => {
    user.passwordResetGetCode(req).then(({ e, rows }) => {
        if (e) {
            res.json({ error: e });
            console.log("password reset error:", e);
        } else {
            const code = `code=${rows[0].code}&email=${req.body.email}`;
            const encryptedQuery = cryptr.encrypt(code);
            sendCode(encryptedQuery)
                .then(() => {
                    res.json({
                        e: null,
                        success:
                            "A reset link has been sent to your email address, notice that the link will expire in 10 minutes",
                    });
                })
                .catch((e) => {
                    res.json({ e: e, success: false });
                });
        }
    });
});

app.get("/api/password", (req, res) => {
    const { tr } = req.query;
    const decryptedquery = cryptr.decrypt(tr);
    const code = decryptedquery.slice(5, 11);
    const email = decryptedquery.slice(18);
    console.log("code:", code);
    console.log("email:", email);
    user.passwordResetCheckCode(code, email).then(({ e, rows }) => {
        if (e) {
            console.log(e);
            res.redirect("/");
        } else {
            console.log("succes! redirect to update password!", rows);
            req.session.verified = true;
            req.session.email = rows.email;

            res.redirect("/");
            //res.json({ error: null, verified: true, email: rows.email });
        }
    });
});

app.put("/api/password", (req, res) => {
    const { email, newpassword } = req.body;
    console.log("UPDATE", email, newpassword);
    user.passwordResetUpdate(email, newpassword)
        .then(() => console.log("updated"))
        .catch((e) => {
            console.log("error during password update!!!", e);
        });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("on 3001");
});
