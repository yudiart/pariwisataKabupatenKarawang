import axios from "axios";
import { setAlert } from "./alert";
import {
    GET_VILLA,
    VILLA_ERROR,
    GET_VILLAS,
    GET_LIKES,
    GET_LIKES_ERROR,
    CLEAR_VILLA,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL
} from "./types";
import {loadUser} from "./auth";

//Login the user
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post("/api/auth", body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error =>
                dispatch(setAlert("Incorrect Email or Password", "danger"))
            );
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};

//Registers the user
export const register = ({ name, email, password}) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify({ name, email, password, role:'villa'});

    try {
        const res = await axios.post("/api/users", body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

//Get current villa profile
export const getCurrentVilla = () => async dispatch => {
    try {
        const res = await axios.get("/api/villa/me");

        dispatch({
            type: GET_VILLA,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: VILLA_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


//Get all user's profiles
export const getVillas = () => async dispatch => {

    try {
        const res = await axios.get("/api/v1/villa");

        dispatch({
            type: GET_VILLAS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: VILLA_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const createVillaProfile = (
    formData,
    history,
    edit = false
) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        //Post request to API/PROFILE
        const res = await axios.post("api/villa", formData, config);

        dispatch({
            type: GET_VILLA,
            payload: res.data
        });

        dispatch(setAlert(edit ? "Villa Updated" : "Villa Created", "success"));

        if (!edit) {
            history.push("/dashboard");
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: VILLA_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


//Get Villa by ID
export const getVillaById = villaId => async dispatch => {
    try {
        const res = await axios.get(`/api/villa/profile/${villaId}`);

        dispatch({
            type: GET_VILLA,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: VILLA_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const getLikes = ()=> async dispatch=>{
    try {
        const res = await axios.get("/api/villa/likes");

        dispatch({
            type: GET_LIKES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_LIKES_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//Logout Villa and clear the Villa
export const logout = () => dispatch => {
    dispatch({ type: CLEAR_VILLA });
    dispatch({ type: LOGOUT });
};