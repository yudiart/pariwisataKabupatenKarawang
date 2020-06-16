import axios from "axios";
import { setAlert } from "./alert";
import {
    ADD_KAMAR,
    KAMAR_ERROR,
    GET_KAMARS,
    UPDATE_WISHLIST,
    DELETE_KAMAR,
    GET_KAMAR, IMAGE_UPLOAD, CLEAR_ROOM,
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

//Get All Room
//No Auth
//Public
export const getAllRooms = ()=> async dispatch =>{
    try{
        const res = await axios.get("/api/room");

        dispatch({
            type: GET_KAMARS,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: KAMAR_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

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

export const deleteRoom = (id) => async dispatch => {
    try {
        await axios.delete(`/api/room/${id}`);

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
//DONE
export const addRoom = (formData,history) => async dispatch => {

    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    try {
        const res = await axios.post("/api/room/", formData, config)

        dispatch({
            type: ADD_KAMAR,
            payload: res.data
        });
        dispatch({
            type: GET_KAMAR,
            payload: res.data,

        });
        dispatch(setAlert("Room Added", "success"));
    } catch (err) {
        dispatch({
            type: KAMAR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
//Add Room for the User
//Add a post
export const addImage = (formData) => async dispatch => {

};
//Get Room
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


export const clearRoom = ()=> async dispatch =>{
    try{
        dispatch({type: CLEAR_ROOM});
    }catch (e) {
        dispatch({type: CLEAR_ROOM});
    }
}