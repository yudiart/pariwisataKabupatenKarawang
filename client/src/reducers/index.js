import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import covid from "./covid";
import room from "./room";
import villa from "./villa";

export default combineReducers({
    alert,
    auth,
    profile,
    post,
    covid,
    villa,
    room
});
