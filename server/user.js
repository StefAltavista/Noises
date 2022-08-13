const bcrypt = require("bcryptjs");
//issue with crypto-random-string
const cryptoRandomString = import("crypto-random-string");
const db = require("./../database/db.js");
var exists, check;

const crypt = (p) => {
    return bcrypt.genSalt().then((s) => {
        return bcrypt.hash(p, s);
    });
};

const decrypt = (p, h) => bcrypt.compare(p, h);

const signin = (req) => {
    const { email, password, first, last, imgUrl, friends } = req.body;
    return db
        .querydb()
        .then(({ rows }) => {
            exists = rows.filter((x) => x.email == email);
            if (exists[0]) {
                let error = exists[0].email + " is not available";
                return { e: error, id: null };
            }

            return crypt(password).then((hash) => {
                return db
                    .register(email, hash, first, last, imgUrl, friends)
                    .then(({ rows }) => {
                        var init = first.split("")[0] + last.split("")[0];
                        return { e: null, id: rows[0].id, init };
                    });
            });
        })
        .catch((e) => {
            return e;
        });
};
const login = (req) => {
    const { email, password } = req.body;
    return db
        .querydb()
        .then(({ rows }) => {
            exists = rows.filter((x) => x.email == email);

            if (exists[0]) {
                return decrypt(password, exists[0].hash).then((validate) => {
                    check = validate;

                    if (check) {
                        return db.queryById(exists[0].id).then(() => {
                            //good place to check for user info!
                            var init =
                                exists[0].name.split("")[0] +
                                exists[0].surname.split("")[0];
                            return {
                                e: null,
                                id: exists[0].id,
                                init,
                            };
                        });
                    } else {
                        return { e: "wrong password", id: null };
                    }
                });
            } else {
                return { e: "wrong email", id: null };
            }
        })
        .catch((e) => {
            return e;
        });
};

const passwordResetGetCode = (req) => {
    const { email } = req.body;
    return db
        .queryByEmail(email)
        .then(({ rows }) => {
            if (!rows[0]) {
                return { e: "email not found", rows: null };
            } else {
                //////////HERE IT STOPS///////////
                const code = cryptoRandomString({ length: 6 });
                return db.newResetCode(code, email).then(({ rows }) => {
                    return { e: null, rows };
                });
            }
        })
        .catch((e) => {
            return e;
        });
};
const passwordResetCheckCode = (code, email) => {
    return db
        .queryResetCode(code, email)
        .then(({ rows }) => {
            if (!rows[0]) {
                return { e: "Wrong Code or E-Mail Address", rows: null };
            } else {
                return { e: null, rows: rows[0] };
            }
        })
        .catch((e) => {
            return e;
        });
};
const passwordResetUpdate = (email, newpassword) => {
    return crypt(newpassword)
        .then((hash) => {
            db.queryUpdatePassword(email, hash);
        })
        .catch((e) => {
            return e;
        });
};
const updateBio = (bio, id) => {
    return db
        .queryUpdateBio(bio, id)
        .then((rows) => {
            return rows;
        })
        .catch((e) => {
            return e;
        });
};
const getUser = (id) => {
    return db
        .queryById(id)
        .then(({ rows }) => {
            return rows;
        })
        .catch((e) => {
            return e;
        });
};

module.exports = {
    getUser,
    signin,
    login,
    passwordResetGetCode,
    passwordResetCheckCode,
    passwordResetUpdate,
    updateBio,
};
