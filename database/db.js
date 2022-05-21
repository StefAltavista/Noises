/* eslint-disable indent */
const spicedPg = require("spiced-pg");

let db;
//SETUP
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

const querydb = () => db.query(`SELECT * FROM users;`);

const queryByEmail = (email) => {
    return db.query(`SELECT * FROM users WHERE users.email = $1 `, [email]);
};

const queryById = (id) => {
    return db.query(`SELECT * FROM users WHERE users.id = $1`, [id]);
};
const register = (email, hash, name, surname, imgUrl, friends) => {
    return db.query(
        `INSERT INTO users (email,hash,name,surname, imgUrl,friends) VALUES( $1 , $2, $3, $4, $5, $6) RETURNING id`,
        [email, hash, name, surname, imgUrl, friends]
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
const getMyfriends = (id) => {
    return db
        .query(`SELECT friends FROM users WHERE users.id=($1);`, [id])
        .then(({ rows }) => rows[0])
        .catch((e) => {
            console.log("Internal Server error: ", e);
            return { e };
        });
};
const pendingReq = (id) => {
    return db.query(
        `SELECT * FROM pending_requests WHERE sender_id=$1 OR recipient_id=$1`,
        [id]
    );
};
const deleteRequest = (otherUserId, myId) => {
    console.log("in db", otherUserId, myId);
    return db.query(
        `DELETE FROM pending_requests WHERE (sender_id=$1 AND recipient_id=$2) OR (sender_id=$1 AND recipient_id=$2) RETURNING *`,
        [otherUserId, myId]
    );
};
const addRequest = (otherUserId, myId) => {
    return db
        .query(
            `INSERT INTO pending_requests (sender_id, recipient_id) VALUES ($1,$2) RETURNING *`,
            [myId, otherUserId]
        )
        .then(({ rows }) => {
            console.log("from Database, pendings updated: ", rows);
            return "Request Sent";
        });
};

const updateFriends = (friends, id) => {
    return db
        .query(`UPDATE users SET friends = $1 WHERE id=$2 RETURNING friends`, [
            friends,
            id,
        ])
        .then(({ rows }) => {
            console.log("from db", rows[0]);
            return rows[0];
        });
};

const messages = () => {
    return db.query(
        `SELECT name,surname,imgURL, messages.id,sender_id, text FROM messages JOIN users ON messages.sender_id=users.id`
    );
};

const addMessage = async (sender_id, text) => {
    const { rows } = await db.query(
        `INSERT INTO messages (sender_id, text) VALUES ($1,$2) RETURNING *`,
        [sender_id, text]
    );

    return db.query(
        `SELECT name,surname,imgURL, messages.id,sender_id, text FROM messages JOIN users ON messages.sender_id=users.id where messages.id=$1`,
        [rows[0].id]
    );
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
    getMyfriends,
    pendingReq,
    addRequest,
    deleteRequest,
    updateFriends,
    messages,
    addMessage,
};
