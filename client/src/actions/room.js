import axios from "axios";
import { setAlert } from "./alert";
import {
    ADD_KAMAR,
    KAMAR_ERROR,
    GET_KAMARS,
    UPDATE_WISHLIST,
    DELETE_KAMAR,
    GET_KAMAR
} from "./types";


//Get Rooms
export const getCurrentRooms = () => async dispatch => {
    try {
        const res = await axios.get("/api/room/villa/me");

        dispatch({
            type: GET_KAMARS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: KAMAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get Rooms
export const getRoomByUser = (id) => async dispatch => {
    try {
        const res = await axios.get("/api/room/villa/:id");

        dispatch({
            type: GET_KAMARS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: KAMAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Add a like to a discussion
export const addWishlist = id => async dispatch => {
    try {
        const res = await axios.put(`/api/rooms/wishlist/${id}`);

        dispatch({
            type: UPDATE_WISHLIST,
            payload: { id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: KAMAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Remove a like to a discussion
export const removeWishlist = id => async dispatch => {
    try {
        const res = await axios.put(`/api/rooms/unwishlist/${id}`);

        dispatch({
            type: UPDATE_WISHLIST,
            payload: { id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: KAMAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Delete a post

export const deleteRoom = id => async dispatch => {
    try {
        await axios.delete(`/api/rooms/${id}`);

        dispatch({
            type: DELETE_KAMAR,
            payload: id
        });

        dispatch(setAlert("Post has been deleted.", "success"));
    } catch (err) {
        dispatch({
            type: KAMAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};



//Add Room for the User
//Add a post

export const addRoom = (formData,history) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        const res = await axios.post("/api/room/", formData, config);

        dispatch({
            type: ADD_KAMAR,
            payload: res.data
        });

        dispatch(setAlert("Room Added", "success"));
        history.push('/dashboard');
    } catch (err) {
        dispatch({
            type: KAMAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
//Get post
export const getRoom = id => async dispatch => {
    try {
        const res = await axios.get(`/api/rooms/${id}`);

        dispatch({
            type: GET_KAMAR,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: KAMAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};