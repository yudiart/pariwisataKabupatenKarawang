import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import room from "./room";
import villa from "./villa";
import admin from "./admin";
import cart from './cart';
import users from "./users";

export default combineReducers({
    alert,
    auth,
    users,
    profile,
    post,
    cart,
    villa,
    room,
    admin
});
