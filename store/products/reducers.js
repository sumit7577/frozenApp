import { LIST_MEMBER } from '../mutations';

const initialState = {
    list: null
};

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case LIST_MEMBER:
            return {
                ...state,
                list: action.payload
            };
        default:
            return state;
    }
}