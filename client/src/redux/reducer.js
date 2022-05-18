import { combineReducers } from "redux";
import { friendsAndRequestsReducer } from "./friendsAndRequests/slice.js";

const rootReducer = combineReducers({
    friendsAndRequests: friendsAndRequestsReducer,
    //messagesReducer: later...
});

export default rootReducer;
