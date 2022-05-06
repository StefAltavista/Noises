const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const user = require("./user.js");
//const session = require("cookie-session");
let exists;

//compressing the response .
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.post("/register", (req, res) => {
    console.log("Request body:", req.body);
    user.neu(req).then(({ e, id, init }) => {
        if (e) {
            exists = e;
            console.log("EXISTS: response JSON", exists);
        } else {
            console.log("ok, ");
            console.log(id, init);
            res.json({ id, init });
        }
    });
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("on 3001");
});
