import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { UserSession } from "../types/userTypes";
import {store} from '../redux/store';
import { userLoggedOut } from "../redux/slice/auth/auth.slice";

const UNAUTHORIZED = 401;

const apiClient = axios.create();

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    let userSessionJSON: UserSession | null = null;
    const userSession = localStorage.getItem('user');
    
    if (userSession) {
        userSessionJSON =  JSON.parse(userSession);
    }

    config.baseURL = 'http://localhost:5000';
    config.timeout = 10000;
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${userSessionJSON?.token}`;

    return config;
});

apiClient.interceptors.response.use((response) => {
    return response;
}, (error: AxiosError) => {
    if(error.response?.status === UNAUTHORIZED) {
        localStorage.removeItem('user');
        store.dispatch(userLoggedOut());
    }
    return Promise.reject(error);
});

export default apiClient