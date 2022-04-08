import { LIST_PRODUCTS } from '../mutations';

const initialState = {
    list: null
};

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case LIST_PRODUCTS:
            return {
                ...state,
                list: action.payload
            };
        default:
            return state;
    }
}