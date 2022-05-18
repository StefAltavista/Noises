export function friendsReducer(friends = [], action) {
    if (action.type == "GET_MY_FRIENDS") {
        friends = [...friends, action.payload.friend];
    }

    return friends;
}

export function getMyFriends(friend) {
    return {
        type: "GET_MY_FRIENDS",
        payload: { friend },
    };
}
