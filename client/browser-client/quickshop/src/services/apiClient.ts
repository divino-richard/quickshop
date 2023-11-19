import axios, { InternalAxiosRequestConfig } from "axios";
import { UserSession } from "../types/userTypes";

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
})

export default apiClient