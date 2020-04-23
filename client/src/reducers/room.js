import {
    GET_KAMAR,
    KAMAR_ERROR,
    UPDATE_WISHLIST,
    DELETE_KAMAR,
    ADD_KAMAR,
    GET_KAMARS
} from "../actions/types";

const initalState = {
    rooms: [],
    room: null,
    loading: true,
    error: {}
};

export default function(state = initalState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_KAMARS:
            return {
                ...state,
                rooms: payload,
                loading: false
            };
        case GET_KAMAR:
            return {
                ...state,
                room: payload,
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
                posts: state.posts.map(post =>
                    post._id === payload.id ? { ...post, likes: payload.likes } : post
                ),
                loading: false
            };
        case DELETE_KAMAR:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            };
        case ADD_KAMAR:
            return {
                ...state,
                rooms: [payload, ...state.rooms],
                loading: false
            };
        default:
            return state;
    }
}
