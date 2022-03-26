import { SHOW_LOADING, LIST_PRODUCTS } from '../mutations';
import httpService from '../../network/http-service';
import { API_ACTIONS } from '../constants';

export function listProducts(payload) {
    return async function (dispatch) {
        dispatch({ type: SHOW_LOADING, payload: true });
        try {
            const response = await httpService.post({ data: payload, action: API_ACTIONS.listProducts });
            dispatch({ type: LIST_PRODUCTS, payload: response.data.data });
        } catch (err) {
            if (err.statusCode === 400 || err.statusCode === 409)
                throw err;
        } finally {
            dispatch({ type: SHOW_LOADING, payload: false });
        }
    };
};