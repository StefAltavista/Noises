export function eventsReducer(events = [], action) {
    if (action.type == "MY_EVENTS") {
        console.log(action.payload.event);
        events = [...events, action.payload.event];
    }
    return events;
}

export function getAllEvent(event) {
    return {
        type: "MY_EVENTS",
        payload: { event },
    };
}

export function addEvent(event) {
    return {
        type: "ADD_EVENT",
        payload: { event },
    };
}
