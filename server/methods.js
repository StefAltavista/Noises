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
const pendingRequests = (id) => {
    return db
        .pendingReq(id)
        .then(({ rows }) => {
            if (!rows) {
                return { match: "No Pending Requests" };
            } else return { rows };
        })
        .catch((e) => {
            console.log("internal Dabase Search error: \n", e);
        });
};

const updateFriendship = (action, otherUserId, myId) => {
    return db
        .friendAction(action, otherUserId, myId)
        .then(({ rows }) => {
            return { e: null, rows };
        })
        .catch((e) => {
            console.log("internal Dabase Search error: \n", e);
            return { e, rows: null };
        });
};
module.exports = {
    search,
    pendingRequests,
    updateFriendship,
};
