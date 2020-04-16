import {
    COVID_ERROR,
    GET_COVID
} from "../actions/types";

//Create initial state
const initialState = {
    covid: [null],
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_COVID:
            return {
                ...state,
                covid: payload,
                loading: false
            };

        case COVID_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}
