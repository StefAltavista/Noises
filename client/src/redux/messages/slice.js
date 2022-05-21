export function messagesReducer(messages = [], action) {
    if (action.type == "GET_ALL_MESSAGES") {
        console.log(action.payload);
        messages = [...messages, ...action.payload];
    }
    if (action.type == "NEW_MESSAGE") {
        //console.log(action.payload);
        messages = [...messages, action.payload];
    }
    return messages;
}

export function getMessages(messages) {
    return {
        type: "GET_ALL_MESSAGES",
        payload: messages,
    };
}

export function newMessage(message) {
    return {
        type: "NEW_MESSAGE",
        payload: message,
    };
}
