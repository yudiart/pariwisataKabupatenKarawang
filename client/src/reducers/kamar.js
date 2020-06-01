import {
    GET_KAMARS,
    KAMAR_ERROR,
    UPDATE_WISHLIST,
    DELETE_KAMAR,
    ADD_KAMAR,
    GET_KAMAR,
} from "../actions/types";

const initalState = {
    kamars: [],
    kamar: null,
    loading: true,
    error: {}
};

export default function(state = initalState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_KAMARS:
            return {
                ...state,
                kamars: payload,
                loading: false
            };
        case GET_KAMAR:
            return {
                ...state,
                kamar: payload,
                loading: false
            };
        case KAMAR_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case UPDATE_WISHLIST:
            return {
                ...state,
                kamars: state.kamars.map(kamar =>
                    kamar._id === payload.id ? { ...kamar, wishList: payload.wishList } : kamar
                ),
                loading: false
            };
        case DELETE_KAMAR:
            return {
                ...state,
                kamars: state.kamars.filter(post => post._id !== payload),
                loading: false
            };
        case ADD_KAMAR:
            return {
                ...state,
                kamar: [payload, ...state.kamar],
                loading: false
            };
        default:
            return state;
    }
}
