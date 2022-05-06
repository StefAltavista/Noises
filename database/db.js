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

const signatoires = (ct, cn) => {
    if (ct) {
        where = ` WHERE LOWER(userData.city) = LOWER('${ct}')`;
    } else if (cn) {
        where = ` WHERE LOWER(userData.country) = LOWER('${cn}')`;
    } else {
        where = "";
    }

    return db.query(`SELECT users.name, userData.age, userData.city, userData.country, userData.website 
                                                FROM users
                                                FULL JOIN userData
                                                ON users.id = userData.user_id
                                                ${where};`);
};

const queryById = (id) =>
    db.query(
        `SELECT * FROM users FULL JOIN userData ON users.id=userData.user_id FULL JOIN signatures ON users.id=signatures.user_id WHERE users.id = $1`,
        [id]
    );
const register = (email, hash, name, surname) => {
    return db.query(
        `INSERT INTO users (email,hash,name,surname) VALUES( $1 , $2, $3, $4) RETURNING id`,
        [email, hash, name, surname]
    );
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

module.exports = {
    querydb,
    signatoires,
    queryById,
    register,
    add,
    sign,
    deletesignature,
    update,
};
