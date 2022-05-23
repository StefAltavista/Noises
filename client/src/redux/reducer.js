import { combineReducers } from "redux";
import { friendsReducer } from "./friends/slice.js";
import { requestReducer } from "./requests/slice.js";
import { setAccountReducer } from "./setMe/slice.js";
import { messagesReducer } from "./messages/slice.js";
import { eventsReducer } from "./events/slice.js";
const rootReducer = combineReducers({
    account: setAccountReducer,
    friends: friendsReducer,
    requests: requestReducer,
    messages: messagesReducer,
    events: eventsReducer,
});

export default rootReducer;
