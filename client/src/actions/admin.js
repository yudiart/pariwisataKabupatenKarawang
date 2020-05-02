import axios from "axios";
import {
    ERROR_GET_ALL_USERS,
    ERROR_GET_ALL_CUSTOMERS,
    GET_ALL_USERS,
    GET_ALL_BY_CUSTOMERS,
    GET_ALL_BY_VILLAS,
    ERROR_GET_ALL_VILLAS,
    GET_ALL_ROOMS,
    ERROR_GET_ALL_ROOMS,
    CLEAR_VILLA, CLEAR_PROFILE, LOGOUT, CLEAR_ADMIN
} from "./types";


//Get All Users
export const getAllUsers = () => async dispatch => {
    try {
        const res = await axios.get('/api/v1/admin/users');
        dispatch({
            type: GET_ALL_USERS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ERROR_GET_ALL_USERS,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get All Customers
export const getAllCustomers = ()=> async dispatch =>{
    try{
        const res = await axios.get('/api/v1/admin/customers');
        dispatch({
            type: GET_ALL_BY_CUSTOMERS,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type:ERROR_GET_ALL_CUSTOMERS,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Get All Villas
export const getAllVillas =()=>async dispatch=>{
    try{
        const res = await axios.get('/api/v1/admin/villas');
        dispatch({
            type: GET_ALL_BY_VILLAS,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type:ERROR_GET_ALL_VILLAS,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Get All Villas
export const getAllRooms =()=>async dispatch=>{
    try{
        const res = await axios.get('/api/v1/admin/rooms');
        dispatch({
            type: GET_ALL_ROOMS,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type:ERROR_GET_ALL_ROOMS,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Logout user and clear the profile
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_ADMIN });

};