import { ADD_PRODUCTS} from '../mutations';

const initialState = {
    list: []
};

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PRODUCTS:
            return {
                ...state,
                list: [action.payload,...state.list]
            };
        default:
            return state;
    }
}