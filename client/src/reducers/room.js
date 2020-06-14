import {
    GET_KAMAR,
    KAMAR_ERROR,
    UPDATE_WISHLIST,
    DELETE_KAMAR,
    ADD_KAMAR,
    ERROR_UPLOAD, IMAGE_UPLOAD,
    GET_KAMARS, CLEAR_ROOM
} from "../actions/types";

const initalState = {
    rooms: [],
    room: null,
    image:null,
    loading: true,
    success: false,
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
        case ERROR_UPLOAD:
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
                room: payload,
                loading: false
            };
        case IMAGE_UPLOAD:
            return{
                ...state,
                room: state.room.map(img=>
                    img[0]
                ),
                loading: false
            }
        case CLEAR_ROOM:
            return {
                ...state,
                room: null,
                loading: false
            }
        default:
            return state;
    }
}
