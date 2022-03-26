import Axios from 'axios';
import URI from 'urijs';
import { AuthenticationError, ServerError, NetworkError, ClientError } from './error-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@env";

const baseUrl = URI(API_URL);
const axios = Axios.create({
    headers: { 'Cache-Control': 'no-cache' }
});

axios.interceptors.request.use(async (request) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }

    return request;
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.message === "Network Error") {
            return Promise.reject(new NetworkError(error.message));
        } else if (error.response.status >= 500) {
            return Promise.reject(
                new ServerError(error.response.data.error, error.response.status)
            );
        } else if (error.response.status === 401) {
            return Promise.reject(new AuthenticationError("Unauthorized"));
        } else if (error.response.status >= 400 && error.response.status < 500) {
            return Promise.reject(
                new ClientError(
                    error.response.data.status || error.response.data,
                    error.response.status
                )
            );
        }

        return Promise.reject({ ...error });
    }
);

export default {
    async post(payload) {
        const url = URI(baseUrl).segment(payload.action);

        const headers = {};
        if (payload.formData)
            headers['headers'] = { 'Content-Type': 'multipart/form-data' }

        return axios.post(url.toString(), payload.data, headers);
    },
    async put(payload) {
        const url = URI(baseUrl).segment(payload.action);
        const headers = {};
        if (payload.formData)
            headers['headers'] = { 'Content-Type': 'multipart/form-data' }

        if (payload.segment)
            url.segment(`${payload.segment}`);

        return axios.put(url.toString(), payload.data, headers);
    },
    async get(payload) {
        const url = URI(baseUrl).segment(payload.action);

        if (payload.query)
            url.addSearch({ ...payload.query });
        else if (payload.segment)
            url.segment(`${payload.segment}`);

        return axios.get(url.toString());
    },
    async delete(payload) {
        const url = URI(baseUrl).segment(payload.action).segment(payload.segment);
        return axios.delete(url.toString());
    },
};
