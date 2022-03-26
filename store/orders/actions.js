import { SHOW_LOADING } from '../mutations';
import httpService from '../../network/http-service';

export function processOrder(payload) {
    return async function (dispatch) {
        dispatch({ type: SHOW_LOADING, payload: true });
        try {
            const response = await httpService.post({ data: payload, action: 'members/add' });
            return response.data;
        } catch (err) {
            if (err.statusCode === 400 || err.statusCode === 409)
                throw err;
        } finally {
            dispatch({ type: SHOW_LOADING, payload: false });
        }
    };
};