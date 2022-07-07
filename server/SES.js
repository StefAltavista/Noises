const aws = require("aws-sdk");

let secret;
if (process.env.NODE_ENV == "production") {
    secret = process.env; // in prod the secrets are environment variables
} else {
    secret = require("../config.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secret.AWS_KEY,
    secretAccessKey: secret.AWS_SECRET,
    region: "eu-west-1", // Make sure this corresponds to the region in which you have verified your email address (or 'eu-west-1' if you are using the Spiced credentials)
});

const sendCode = (code, email = "stefanomsc@hotmail.it") => {
    return ses
        .sendEmail({
            Source: "Lyly Noises <lily.postage@spicedling.email>",
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                    Text: {
                        Data: `To reset your password follow this Link: http://localhost:3000/api/password?tr=${code}`,
                    },
                },
                Subject: {
                    Data: "Noises - Reset Password",
                },
            },
        })
        .promise()
        .then(() => console.log("email sent"))
        .catch((err) => console.log(err));
};
module.exports = {
    sendCode,
};
