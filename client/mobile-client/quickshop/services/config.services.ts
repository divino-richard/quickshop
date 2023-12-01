import axios, { AxiosError, AxiosResponse, AxiosResponseHeaders, InternalAxiosRequestConfig } from "axios";
import { API_END_POINT } from "../constants/Services";
import { userSession } from "../utils/session.utils";
import { router } from "expo-router";

const apiClient = axios.create();

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.baseURL = API_END_POINT;
    config.timeout = 1000 * 60;
    config.headers['Content-Type'] = 'application/json';
    
    userSession.get('session')
        .then((userSession) => {
            if(userSession) {
                config.headers['Authorization'] = `Bearer ${userSession.token}`;
            }
        })
        .catch((error) => {
            console.log('User Session Error: ', error);
        })

    return config;

}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use((response) => {
    return response;

}, (error: AxiosError) => {
    if (error.response?.status === 401) {
        router.push('/auth/login');
    }
    return Promise.reject(error);
})

export default apiClient