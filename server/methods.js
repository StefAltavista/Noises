/* eslint-disable indent */
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
const myfriends = (id) => {
    return db
        .getMyfriends(id)
        .then((rows) => {
            return rows;
        })
        .catch((e) => console.log(e));
};
const pendingRequests = (id) => {
    return db
        .pendingReq(id)
        .then(({ rows }) => {
            if (!rows[0]) {
                return { match: "No Pending Requests" };
            } else return { rows: rows };
        })
        .catch((e) => {
            console.log("internal Dabase Search error: \n", e);
        });
};

const updateFriendship = (action, otherUserId, myId) => {
    switch (action) {
        case "unfriend":
            return db.getMyfriends(myId).then(({ friends }) => {
                const idx = friends.indexOf(+otherUserId);
                friends.splice(idx, 1);
                console.log("friends after splice:", friends);
                return db
                    .updateFriends(friends, myId)
                    .then(() => "Request Friendship");
            });
        case "accept":
            return (async function (myId, otherUserId) {
                let theirFriends = await db.getMyfriends(otherUserId);
                theirFriends = theirFriends.friends;
                if (!theirFriends[0]) {
                    theirFriends = [];
                }
                console.log("methods:", theirFriends);
                theirFriends.push(myId);
                console.log("other user friends after unsift:", theirFriends);
                db.updateFriends(theirFriends, otherUserId);

                return db.getMyfriends(myId).then(({ friends }) => {
                    // friends ? (friends = friends.friends) : (friends = []);

                    if (!friends) {
                        friends = [];
                    }
                    console.log("myfriends:", friends, "theirID:", otherUserId);
                    friends.push(otherUserId);
                    console.log("friends after push:", friends);
                    return db.updateFriends(friends, myId).then(() => {
                        db.updatePendings(otherUserId, myId);
                        return "Unfriend";
                    });
                });
            })(myId, otherUserId);

        case "request":
            return db.addRequest(otherUserId, myId);
    }

    return db
        .friendAction(action, otherUserId, myId)
        .then((update) => {
            return update;
        })
        .catch((e) => {
            console.log("internal Dabase Search error: \n", e);
            return { e };
        });
};
module.exports = {
    search,
    pendingRequests,
    updateFriendship,
    myfriends,
};
