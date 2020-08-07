import axios from "axios";
import {
    GET_CARTS,
    GET_CART_ITEM,
    ERROR_GET_ALL_USER,
    ERROR_GET_CURRENT_USER,
    CLEAR_CARTS,
    CARTS_ERROR,
    COUNT_CART,
    GET_ALL_USERS
} from "./types";

export const addCarts = ()=> async dispatch => {
    try{
        const res = await axios.put('/api/v1/cart');

        dispatch({

        })
    }catch(err){

    }
}

//Get Covid
export const getCarts = () => async dispatch => {
    try {
        const res = await axios.get('/api/v1/cart');

        dispatch({
            type: GET_CARTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: CARTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const getCountCarts = ()=> async dispatch =>{
    try{
        const res = await axios.get('/api/v1/cart/count');

        dispatch({
            type: COUNT_CART,
            payload: res.data
        });
    }catch(err){

    }
}

export const getAllUserById = ()=> async dispatch =>{
    try{
        const res = await axios.get('/api/auth/all');

        dispatch({
            type: GET_ALL_USERS,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type:CLEAR_CARTS,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}