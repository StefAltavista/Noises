export function requestReducer(requests = [], action) {
    if (action.type == "GET_MY_REQUESTS") {
        requests = [...requests, action.payload.request];
    }
    if (action.type == "ACCEPT_REQUEST" || action.type == "REJECT_REQUEST") {
        let idx = requests.findIndex((request) => {
            return request.sender_id == action.payload.id;
        });
        console.log("remove request with sender_id:", idx);
        requests = [...requests];
        requests.splice(idx, 1);
    }

    return requests;
}

export function getMyRequests(request) {
    return {
        type: "GET_MY_REQUESTS",
        payload: { request },
    };
}

export function acceptRequest(id) {
    return {
        type: "ACCEPT_REQUEST",
        payload: { id },
    };
}
export function rejectRequest(id) {
    return {
        type: "REJECT_REQUEST",
        payload: { id },
    };
}
