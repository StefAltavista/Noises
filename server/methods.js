const db = require("./../database/db.js");

const search = (query) => {
    return db
        .search(query.s)
        .then(({ rows }) => {
            if (!rows) {
                return { match: "No Matches" };
            } else return { matches: rows };
        })
        .catch((e) => {
            console.log("internal Dabase Search error: \n", e);
        });
};

module.exports = {
    search,
};
