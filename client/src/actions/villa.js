import axios from "axios";
import { setAlert } from "./alert";
import {
    GET_VILLA,
    VILLA_ERROR,
    PROFILE_ERROR, CLEAR_PROFILE, GET_PROFILES, GET_VILLAS
} from "./types";
import profile from "../reducers/profile";


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
        const res = await axios.get("/api/villa");

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
