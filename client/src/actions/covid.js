import axios from "axios";
import {
   COVID_ERROR,
    GET_COVID
} from "./types";


//Get Covid
export const getCovid = () => async dispatch => {
    try {
        const config = {
            headers: {
                "Origin": "https://kawalcovid19.id"
            }
        };
        const res = await axios.get(`https://api.kawalcovid19.id/v1/api/case/summary`, config);

        dispatch({
            type: GET_COVID,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: COVID_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
