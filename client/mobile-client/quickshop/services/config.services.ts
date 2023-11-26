import axios, { InternalAxiosRequestConfig } from "axios";
import { API_END_POINT } from "../constants/Services";
// import { UserSession } from "../types/userTypes";

const apiClient = axios.create();

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // let userSessionJSON: UserSession | null = null;
    // const userSession = localStorage.getItem('user');
    
    // if (userSession) {
    //     userSessionJSON =  JSON.parse(userSession);
    // }

    config.baseURL = API_END_POINT;
    config.timeout = 1000 * 60;
    config.headers['Content-Type'] = 'application/json';
    // config.headers['Authorization'] = `Bearer ${userSessionJSON?.token}`;

    return config;
})

export default apiClient