const nodemailer = require("nodemailer");

const email = require("../config.json").EMAIL_NAME;
const pass = require("../config.json").EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: { user: email, pass: pass },
});

const sendEmail = (receiver, message) => {
    return new Promise((resolve, reject) => {
        const options = {
            from: email,
            to: receiver,
            subject: "subject",
            text: message,
        };

        transporter.sendMail(options, function (err, info) {
            if (err) {
                console.log(err);
                reject({ err, success: "ok" });
            }

            console.log("sent!", info.response);
            resolve({ err: null, success: "ok" });
        });
    });
};

module.exports = {
    sendEmail,
};
