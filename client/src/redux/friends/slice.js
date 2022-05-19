export function friendsReducer(friends = [], action) {
    if (action.type == "GET_MY_FRIENDS") {
        friends = [action.payload.friend, ...friends];
    }
    if (action.type == "ACCEPT_FRIEND") {
        friends = [action.payload.friend, ...friends];
    }
    if (action.type == "UNFRIEND") {
        let idx = friends.findIndex((friend) => {
            return friend.id == action.payload.id;
        });
        console.log("remove friend with index:", idx);
        friends = [...friends];
        friends.splice(idx, 1);
    }

    return friends;
}

export function getMyFriends(friend) {
    return {
        type: "GET_MY_FRIENDS",
        payload: { friend },
    };
}
export function acceptFriend(friend) {
    return {
        type: "ACCEPT_FRIEND",
        payload: { friend },
    };
}
export function unfriend(id) {
    return {
        type: "UNFRIEND",
        payload: { id },
    };
}
