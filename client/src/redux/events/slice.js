export function eventsReducer(events = [], action) {
    if (action.type == "ADD_EVENT") {
        console.log(action.payload.event);
        events = [...events, action.payload.event];
    }
    return events;
}

export function addEvent(event) {
    return {
        type: "ADD_EVENT",
        payload: { event },
    };
}
