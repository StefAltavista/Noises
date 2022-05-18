import { combineReducers } from "redux";
import { friendsReducer } from "./friends/slice.js";
import { requestReducer } from "./requests/slice.js";
const rootReducer = combineReducers({
    friends: friendsReducer,
    requests: requestReducer,
    //messagesReducer: later...
});

export default rootReducer;
