import axios from "axios";
import {setAlert} from './alert';
import setAuthToken from "../utils/setAuthToken";
import {ERROR_GET_QUESTION, GET_ALL_QUESTION, SUCCESS_CREATE_QUESTION} from "./types";

export const getQuiz = () => async dispatch =>{
    try{
        const ress = JSON.parse(localStorage.getItem('state'))

        dispatch({
            type: GET_ALL_QUESTION,
            payload: ress.data
        })
    }catch(err){
        if(err){
            console.log('error')
        }
        dispatch({
            type: ERROR_GET_QUESTION
        })
    }

}
export const create = (state) => async dispatch =>{
    try{
        const set = localStorage.setItem('state', JSON.stringify(state))

        dispatch({
            type:SUCCESS_CREATE_QUESTION,
            payload: set.data
        })
        console.log(set.data)
    }catch(err){

    }
}