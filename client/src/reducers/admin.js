import {
    GET_ALL_USERS,
    GET_ALL_ROOMS,
    GET_ALL_BY_VILLAS,
    GET_ALL_BY_CUSTOMERS,
    CLEAR_ADMIN
} from "../actions/types";

//Create initial state
const initialState = {
    villas: [],
    villa: null,
    rooms: [],
    room: null,
    customers: [],
    customer: null,
    users:[],
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_BY_VILLAS:
            return {
                ...state,
                villas: payload,
                loading: false
            };
        case GET_ALL_USERS:
            return{
                ...state,
                users: payload,
                loading: false
            }
        case GET_ALL_BY_CUSTOMERS:
            return {
                ...state,
                customers: payload,
                loading: false
            };
        case GET_ALL_ROOMS:
            return {
                ...state,
                rooms: payload,
                loading: false
            }
        case CLEAR_ADMIN:
            return {
                ...state,
                villas:null,
                villa: null,
                room: null,
                customer: null,
                users:null,
                customers:null,
                rooms:null,
                loading: false
            };
        default:
            return state;
    }
}
