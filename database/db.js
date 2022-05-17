/* eslint-disable indent */
const spicedPg = require("spiced-pg");

let db;

if (process.env.DATABASE_URL) {
    // it means that the app runs on heroku
    db = spicedPg(process.env.DATABASE_URL);
} else {
    // the app runs locally
    // const {
    //     DATABASE_USER,
    //     DATABASE_PASSWORD,
    //     DATABASE_NAME,
    // } = require("./secrets.json");
    db = spicedPg("postgres:postgres:postgres@localhost:5432/socialnetwork");
    // console.log(`[db] Connecting to: ${DATABASE_NAME}`);
    console.log(`[db] Connecting to: local`);
}

//const db = spicedPg("postgres:postgres:postgres@localhost:5432/petition");
var where;

const querydb = () => db.query(`SELECT * FROM users;`);

const queryByEmail = (email) => {
    return db.query(`SELECT * FROM users WHERE users.email = $1 `, [email]);
};

const queryById = (id) =>
    db.query(`SELECT * FROM users WHERE users.id = $1`, [id]);
const register = (email, hash, name, surname, imgUrl) => {
    return db.query(
        `INSERT INTO users (email,hash,name,surname, imgUrl) VALUES( $1 , $2, $3, $4, $5) RETURNING id`,
        [email, hash, name, surname, imgUrl]
    );
};
const newResetCode = (code, email) => {
    return db.query(
        `INSERT INTO resetCode (code, email) VALUES ($1, $2) RETURNING *`,
        [code, email]
    );
};

const queryResetCode = (code, email) => {
    return db.query(
        `SELECT * FROM resetCode WHERE code=$1 AND email=$2 AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'`,
        [code, email]
    );
};

const queryUpdatePassword = (email, hash) => {
    return db.query(`UPDATE users SET email = $1, hash = $2 WHERE email=$1`, [
        email,
        hash,
    ]);
};

//UPDATE table_name SET column1 = value1 WHERE condition
const insertImg = (imgUrl, id) => {
    return db.query(
        `UPDATE users SET imgUrl = $1 WHERE users.id=$2 RETURNING *`,
        [imgUrl, id]
    );
};
const queryUpdateBio = (bio, id) => {
    return db.query(`UPDATE users SET bio = $1 WHERE users.id=$2 RETURNING *`, [
        bio,
        id,
    ]);
};
const search = (s) => {
    return db.query(
        `SELECT * FROM users WHERE name ILIKE $1 OR surname ILIKE $1;`,
        [s + "%"]
    );
};

const pendingReq = (id) => {
    return db.query(
        `SELECT * FROM friendships WHERE sender_id=$1 OR recipient_id=$1`,
        [id]
    );
};
const friendAction = (action, otherUserId, myId) => {
    switch (action) {
        case "unfriend":
            return db
                .query(`SELECT friends FROM users WHERE id=$1`, [myId])
                .then(({ rows }) => {
                    console.log("my Friends", rows);
                    //find otherUserId in rows and slice it out
                });
        case "accept":
            db.query(`SELECT friends FROM users WHERE id=$1`, [myId]).then(
                (rows) => {
                    console.log(rows);
                    //push into myFriends -> otherUserId
                }
            );
            return db.query(`UPDATE users (friends) VALUES ($1)`);

        case "request":
            return db.query(
                `INSERT INTO friendship (sender_id, recipient_id) VALUES ($1,$2)`,
                [myId, otherUserId]
            );
    }
};

module.exports = {
    querydb,
    queryByEmail,
    queryById,
    register,
    newResetCode,
    queryResetCode,
    queryUpdatePassword,
    insertImg,
    queryUpdateBio,
    search,
    pendingReq,
    friendAction,
};
