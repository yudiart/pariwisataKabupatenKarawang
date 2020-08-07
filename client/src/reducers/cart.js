import {
    GET_CARTS,
    GET_CART_ITEM,COUNT_CART,
    ADD_CART,
    CLEAR_CARTS
} from "../actions/types";

//Create initial state
const initialState = {
    carts: [],
    item: null,
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_CART:
            return {
                ...state,
                item: payload,
                loading:false
            }
        case GET_CARTS:
            return {
                ...state,
                carts: payload,
                loading: false
            };
        case COUNT_CART:
            return {
                ...state,
                count: payload,
                loading: false
            };
        case GET_CART_ITEM:
            return{
                ...state,
                item: payload,
                loading: false
            }
        case CLEAR_CARTS:
            return {
                ...state,
                carts: null,
                item: null,
                loading: true,
                count: null
            }
        default:
            return state;
    }
}
