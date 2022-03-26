import { DEFAULT_ERROR, SIGN_IN, SIGN_OUT, GET_SUBJECT_LIST, SIGN_UP } from './actions';

export const API_ACTIONS = {
    login: '',
    register: '',
    listProducts: 'list-products'
}

export const NOTIFICATION_MESSAGES = Object.freeze({
    [DEFAULT_ERROR]: {
        error: {
            message: 'Something went wrong!'
        }
    },
    [SIGN_OUT]: {
        message: 'You have been logged out.'
    },
    [SIGN_IN]: {
        success: {
            message: 'Logged in successfully!'
        },
        error: {
            message: 'invalid username or password'
        }
    },
    [SIGN_UP]: {
        success: {
            message: 'Signed up successfully!'
        },
        error: {
            message: 'Something went wrong!'
        }
    },
    [GET_SUBJECT_LIST]: {
        error: {
            message: 'Something went wrong!'
        }
    }
})