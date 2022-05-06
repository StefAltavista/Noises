const bcrypt = require("bcryptjs");
const db = require("./../database/db.js");
var exists, data, signed, check;

const neu = (req) => {
    const { email, password, first, last } = req.body;
    return db.querydb().then(({ rows }) => {
        exists = rows.filter((x) => x.email == email);
        console.log(exists[0]);
        if (exists[0]) {
            return { e: exists[0].email, id: null };
        }

        return crypt(password).then((hash) => {
            return db.register(email, hash, first, last).then(({ rows }) => {
                var n = first.split("")[0] + last.split("")[0];
                return { e: null, id: rows[0].id, init: n };
            });
        });
    });
};
const login = (req) => {
    const { email, password } = req.body;
    return db.querydb().then(({ rows }) => {
        exists = rows.filter((x) => x.email == email);

        if (exists[0]) {
            console.log("email found");
            return decrypt(password, exists[0].hash).then((validate) => {
                check = validate;

                if (check) {
                    console.log("correct password");
                    return db.queryById(exists[0].id).then(({ rows }) => {
                        console.log("USER:", rows);
                        if (
                            rows[0].age ||
                            rows[0].city ||
                            rows[0].country ||
                            rows[0].website
                        ) {
                            data = "data added";
                        } else data = null;
                        if (rows[0].signature) {
                            signed = "Signed";
                        } else {
                            signed = null;
                        }
                        console.log("data,signature:", data, signed);
                        var n =
                            exists[0].name.split("")[0] +
                            exists[0].last.split("")[0];
                        return {
                            e: null,
                            id: exists[0].id,
                            init: n,
                            data: data,
                            signed: signed,
                        };
                    });
                } else {
                    console.log("wrong password");
                    return { e: "wrong password", id: null };
                }
            });
        } else {
            console.log("email not found");
            return { e: "wrong email", id: null };
        }
    });
};

const crypt = (p) => {
    return bcrypt.genSalt().then((s) => {
        return bcrypt.hash(p, s);
    });
};

const decrypt = (p, h) => bcrypt.compare(p, h);

module.exports = {
    crypt,
    decrypt,
    neu,
    login,
};
