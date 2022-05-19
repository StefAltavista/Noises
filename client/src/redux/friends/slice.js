export function friendsReducer(friends = [], action) {
    if (action.type == "GET_MY_FRIENDS") {
        console.log(action.payload.friends);
        friends = [...action.payload.friends, ...friends];
    }
    if (action.type == "ACCEPT_FRIEND") {
        friends = [...action.payload.friend, ...friends];
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

export function getMyFriends(friends) {
    return {
        type: "GET_MY_FRIENDS",
        payload: { friends },
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
