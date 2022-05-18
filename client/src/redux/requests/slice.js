export function requestReducer(requests = [], action) {
    if (action.type == "GET_MY_REQUESTS") {
        requests = [...requests, action.payload.request];
    }

    return requests;
}

export function getMyRequests(request) {
    return {
        type: "GET_MY_REQUESTS",
        payload: { request },
    };
}
