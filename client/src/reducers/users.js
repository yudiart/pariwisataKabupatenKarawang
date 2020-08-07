import {
    GET_ALL_USERS,
    ERROR_GET_ALL_USERS,
    GET_CURRENT_USER,
    ERROR_GET_CURRENT_USER,
    CLEAR_ALL_USERS,
    CLEAR_CURRENT_USERS
} from "../actions/types";

const initalState = {
    users: [],
    user: null,
    loading: true,
    error: {}
};

export default function(state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_ALL_USERS:
            return {
                ...state,
                users: payload,
                loading: false
            };
        case GET_CURRENT_USER:
            return {
                ...state,
                user: payload,
                loading: false
            };
        case ERROR_GET_ALL_USERS:
        case ERROR_GET_CURRENT_USER:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case CLEAR_ALL_USERS:
        case CLEAR_CURRENT_USERS:
            return {
                ...state,
                users: null,
                user: null,
                loading: false
            }
        default:
            return state;
    }
}
