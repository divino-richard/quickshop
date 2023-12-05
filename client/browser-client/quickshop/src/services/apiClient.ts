import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { UserSession } from "../types/userTypes";
import {store} from '../redux/store';
import { userLoggedOut } from "../redux/slice/auth/auth.slice";
import { API_END_POINT } from "../constant/api.constant";

const UNAUTHORIZED = 401;

function apiClient(contentType: string) {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        let userSessionJSON: UserSession | null = null;
        const userSession = localStorage.getItem('user');
        
        if (userSession) {
            userSessionJSON =  JSON.parse(userSession);
        }

        config.baseURL = API_END_POINT;
        config.timeout = 10000;
        config.headers['Content-Type'] = contentType;
        config.headers['Authorization'] = `Bearer ${userSessionJSON?.token}`;

        return config;
    });

    axiosInstance.interceptors.response.use((response) => {
        return response;
    }, (error: AxiosError) => {
        if(error.response?.status === UNAUTHORIZED) {
            localStorage.removeItem('user');
            store.dispatch(userLoggedOut());
        }
        return Promise.reject(error);
    });

    return axiosInstance;
}

export default apiClient;
