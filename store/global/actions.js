import { SHOW_LOADING, UPDATE_PLANS } from '../mutations';
import { AuthenticationError, NetworkError, ClientError, ServerError } from '../../network/error-types';
import { NOTIFICATION_MESSAGES } from '../constants';
import { DEFAULT_ERROR } from '../actions'
import httpService from '../../network/http-service';

export function showLoading(payload) {
    return function (dispatch) {
        dispatch({ type: SHOW_LOADING, payload: payload });
    }
};

export function getPlans() {
    return async function (dispatch) {
        dispatch({ type: SHOW_LOADING, payload: true });
        try {
            const response = await httpService.get({ action: 'master-data/plans' });
            dispatch({ type: UPDATE_PLANS, payload: response.data });
        } catch (err) {
            if (err.statusCode === 400 || err.statusCode === 409)
                throw err;
            //dispatch(handleError(UPDATE_PLANS, err));
        } finally {
            dispatch({ type: SHOW_LOADING, payload: false });
        }
    };
};

export function handleError(action, error) {
    return function (dispatch) {
        action = action || DEFAULT_ERROR;
        if (error instanceof AuthenticationError) {
            dispatch({ type: UPDATE_NOTIFICATION, payload: NOTIFICATION_MESSAGES[SIGN_OUT] });
            dispatch({ type: UPDATE_USER, payload: null });
            dispatch({ type: UPDATE_LOGGED_IN, payload: false });
        }
        else if (error instanceof ClientError) {
            dispatch({
                type: UPDATE_NOTIFICATION, payload: NOTIFICATION_MESSAGES[action].error
            });
        }
        else {
            const errorObj = NOTIFICATION_MESSAGES[action].error;
            dispatch({
                type: UPDATE_NOTIFICATION, payload: {
                    title: errorObj.title,
                    variant: errorObj.variant,
                    message: error.message || errorObj.message
                }
            });
        }
    }
};