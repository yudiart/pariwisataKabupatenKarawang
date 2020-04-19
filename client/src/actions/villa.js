import axios,{useState} from "axios";
import { setAlert } from "./alert";
import {
    GET_VILLA,
    VILLA_ERROR,
    UPDATE_VILLA,
    CLEAR_VILLA,
    ACCOUNT_DELETED,
    GET_VILLAS,
    GET_REPOS, GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, GET_PROFILES, UPDATE_PROFILE
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
    //Clear what ever is in the current user's profile
    dispatch({ type: CLEAR_PROFILE });

    try {
        const res = await axios.get("/api/villa");

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
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

//Add Experience for the User
export const addKamar = (formData, history,villa,files) => async dispatch => {
        const[Images, setImages]=useState([]);
        let formData = new FormData();
        try {
            const config = {
                headers: {'Content-Type': 'multipart/form-data'}
            };
            formData.append('files', files[0])
            //Post request to API/PROFILE
            const res = await axios.put("api/villa/kamar", formData, config)
                .then((response) => {
                    if (response.data.success) {
                        setImages(...Images, [response.data.image])
                        villa.refreshFunction([...Images, response.data.image])
                    } else {
                        alert('Failed to save the image in server')
                    }
                })

            dispatch({
                type: UPDATE_VILLA,
                payload: res.data
            });
            dispatch(setAlert("Kamar Added", "success"));
            history.push("./dashboard");
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