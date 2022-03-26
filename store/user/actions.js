import { UPDATE_USER, SHOW_LOADING } from '../mutations';
import { handleError } from '../global/actions';
import httpService from '../../network/http-service';
import { API_ACTIONS } from '../constants';

export function login(payload) {
    return async function (dispatch) {
        dispatch({ type: SHOW_LOADING, payload: true });
        try {
            const response = await httpService.post({ data: payload, action: API_ACTIONS.login });
            return response.data;
        } catch (err) {
            if (err.statusCode === 400 || err.statusCode === 409)
                throw err;
        } finally {
            dispatch({ type: SHOW_LOADING, payload: false });
        }
    };
};

export function register(payload) {
    return async function (dispatch) {
        dispatch({ type: SHOW_LOADING, payload: true });
        try {
            const response = await httpService.post({ data: payload, action: API_ACTIONS.register });
            return response.data;
        } catch (err) {
            if (err.statusCode === 400 || err.statusCode === 409)
                throw err;
        } finally {
            dispatch({ type: SHOW_LOADING, payload: false });
        }
    };
};


export function updateUser(payload) {
    return function (dispatch) {
        dispatch({ type: UPDATE_USER, payload: payload });
    }
}