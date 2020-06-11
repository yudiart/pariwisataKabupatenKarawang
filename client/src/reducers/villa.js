import {
    GET_VILLA,
    VILLA_ERROR,
    CLEAR_VILLA,
    UPDATE_VILLA,
    GET_VILLAS,
    GET_LIKES,
    GET_LIKES_ERROR,
    GET_VILLA_KAMAR
} from "../actions/types";

//Create initial state
const initialState = {
    villa: null,
    likes: null,
    villas: [],
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_VILLA:
        case UPDATE_VILLA:
            return {
                ...state,
                villa: payload,
                loading: false
            };
        case GET_LIKES:
            return{
                ...state,
                likes:payload,
                loading:false
            }
        case GET_VILLAS:
            return {
                ...state,
                villas: payload,
                loading: false
            };

        case VILLA_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_VILLA:
            return {
                ...state,
                villa: null,
                loading: false
            };

        case GET_VILLA_KAMAR:
            return {
                ...state,
                kamar: payload,
                loading: false
            };
        default:
            return state;
    }
}
