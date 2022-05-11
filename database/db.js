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
const register = (email, hash, name, surname) => {
    return db.query(
        `INSERT INTO users (email,hash,name,surname) VALUES( $1 , $2, $3, $4) RETURNING id`,
        [email, hash, name, surname]
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
const add = (user_id, age, city, country, website) => {
    return db.query(
        `INSERT INTO userData (user_id, age, city, country, website)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (user_id)
        DO UPDATE SET age=$2, city=$3, country=$4, website=$5 `,
        [user_id, age, city, country, website]
    );
};

const sign = (user_id, signature) => {
    return db.query(
        `INSERT INTO signatures (user_id, signature) VALUES ($1, $2) RETURNING id`,
        [user_id, signature]
    );
};
const deletesignature = (id) => {
    return db.query(`DELETE FROM signatures WHERE user_id= $1`, [id]);
};
const update = (
    user_id,
    name,
    surname,
    age,
    city,
    country,
    website,
    email,
    hash
) => {
    db.query(
        `INSERT INTO users (id, name, surname, email, hash)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (id)
    DO UPDATE SET name=$2, surname=$3`,
        [user_id, name, surname, email, hash]
    );
    return db.query(
        `INSERT INTO userData (user_id, age, city, country, website)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (user_id)
    DO UPDATE SET age=$2, city=$3, country=$4, website=$5 `,
        [user_id, age, city, country, website]
    );
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
    //olds
    add,
    sign,
    deletesignature,
    update,
};
