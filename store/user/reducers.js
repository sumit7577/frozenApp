import { UPDATE_USER, LOG_OUT, UPDATE_LOGGED_IN } from '../mutations';

const initialState = {
    user: {},
    isLoggedIn: false,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload,
                isLoggedIn: action.payload != null,
            };
        case UPDATE_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.payload
            };
        case LOG_OUT:
            return initialState;
        default:
            return state;
    }
};
