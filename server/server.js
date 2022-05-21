//SERVER setup

//express
const express = require("express");
const app = express();

///socket.io
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

//set up cookies in express.app & socket.io
const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret: `MaskingTheCookieWithThisString`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});
app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

// set up multer
const multer = require("multer");
const { upload } = require("./s3");
const uidSafe = require("uid-safe");
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "uploads")); // null (if no err!)
    },
    filename: (req, file, callback) => {
        uidSafe(24).then((randomId) => {
            const fileName = `${randomId}${path.extname(file.originalname)}`; // null (if no err!)
            callback(null, fileName);
        });
    },
});
const uploader = multer({ storage });
app.use(express.urlencoded({ extended: false }));

//encrypting library
const Cryptr = require("cryptr");
const cryptr = new Cryptr("cryptingKey");

//my libraries
const user = require("./user.js");
const db = require("./../database/db.js");
const { sendCode } = require("./SES.js");
const { checkRegistration } = require("./middleware.js");
const {
    search,
    pendingRequests,
    updatePendings,
    updateFriendship,
    myfriends,
    getMessages,
    postMessage,
} = require("./methods.js");

//middlewares and helpers
const chalk = require("chalk");
const path = require("path");
//compressing the response
const compression = require("compression");
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

app.get("/user", async (req, res) => {
    const currentUser = await user.getUser(req.session.userId);
    res.json(currentUser[0]);
});
app.post("/api/getuser", (req, res) => {
    console.log(req.body);
    user.getUser(req.body.id).then((result) => {
        if (!result[0]) {
            console.log("nothing here!");
            result[0] = { nomatch: true };
        }
        res.json(result[0]);
    });
});
app.get("/user/friends", async (req, res) => {
    myfriends(req.session.userId).then(({ friends }) => {
        console.log("Server get fr - myfriends:", friends);
        if (!friends) {
            res.json([]);
        } else {
            res.json(friends);
        }
    });
});

app.get("/pending", async (req, res) => {
    pendingRequests(req.session.userId).then(({ rows }) => {
        if (!rows) {
            res.json([]);
        } else {
            res.json(rows);
        }
        console.log("PENDING REQUESTS:", rows);
    });
});

app.put("/pending", async (req, res) => {
    const otherUserId = req.body.id;
    updatePendings(otherUserId, req.session.userId).then((rows) =>
        res.json(rows)
    );
});
app.put("/user/connect", async (req, res) => {
    const { action, otherUserId } = req.body;
    console.log(action);
    updateFriendship(action, otherUserId, req.session.userId).then((x) => {
        console.log("Server - updatefriendship:", x);
        res.json(x);
    });
});

app.post("/upload_profile_pic", uploader.single("file"), upload, (req, res) => {
    //console.log("\n\nPOST, req file filename \n", req.file.filename, "\n\n");
    let imgUrl = "https://s3.amazonaws.com/spicedling/" + req.file.filename;
    if (req.file) {
        db.insertImg(imgUrl, req.session.userId).then(({ rows }) => {
            res.json(rows[0]);
        });
    } else {
        res.json({
            success: false,
        });
    }
});

app.post("/editbio", (req, res) => {
    user.updateBio(req.body.bio, req.session.userId).then(({ rows }) => {
        res.json(rows[0].bio);
    });
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

    user.passwordResetUpdate(email, newpassword)
        .then(() => res.json({ success: true }))
        .catch(() => {
            res.json({ success: false });
        });
});

app.get("/api/search", (req, res) => {
    search(req.query)
        .then(({ matches }) => {
            res.json({ matches });
        })
        .catch((e) => console.log("internal Server/Search error: \n", e));
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

io.on("connection", function (socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId;
    console.log(
        chalk.black.bgGreen.bold(
            `USER: ${userId} CONNECTED on socket ${socket.id}`
        )
    );
    socket.on("disconnect", function () {
        console.log(
            chalk.black.bgRed.bold(
                `USER: ${userId} DISCONNECTED socket ${socket.id}`
            )
        );
    });
    socket.on("GET_MESSAGES", async function () {
        const messages = await getMessages();
        socket.emit("MESSAGES", messages);
    });

    socket.on("sendMessage", async function (data) {
        const { message } = data;
        //get user data
        const newMessage = await postMessage(
            message.sender_id,
            message.text
        ).then((rows) => {
            return rows[0];
        });
        io.emit("newMessage", {
            message: newMessage,
        });
    });
});

//share the server between express and socket.io
server.listen(process.env.PORT || 3001, function () {
    console.log("on 3001");
});
