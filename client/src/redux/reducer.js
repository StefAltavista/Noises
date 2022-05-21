import { combineReducers } from "redux";
import { friendsReducer } from "./friends/slice.js";
import { requestReducer } from "./requests/slice.js";
import { setAccountReducer } from "./setMe/slice.js";
import { messagesReducer } from "./messages/slice.js";
const rootReducer = combineReducers({
    account: setAccountReducer,
    friends: friendsReducer,
    requests: requestReducer,
    messages: messagesReducer,
});

export default rootReducer;
