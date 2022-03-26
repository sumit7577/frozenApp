import { SHOW_LOADING, SHOW_NOTIFICATION, UPDATE_NOTIFICATION, UPDATE_PLANS } from '../mutations';

const initialState = {
    spinner: 0,
    notification: null,
    showNotification: false,
    planList: []
};

export default function globalReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_LOADING:
            return {
                ...state,
                spinner: action.payload ? state.spinner + 1 : state.spinner - 1
            };
        case SHOW_NOTIFICATION:
            return {
                ...state,
                showNotification: !state.showNotification
            };
        case UPDATE_NOTIFICATION:
            return {
                ...state,
                notification: action.payload,
                showNotification: true
            };
        case UPDATE_PLANS:
            return {
                ...state,
                planList: action.payload
            };
        default:
            return state;
    }
}