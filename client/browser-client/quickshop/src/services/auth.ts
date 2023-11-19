import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

interface Credentials {
    email: string;
    password: string;
}

export function loginUser(data: Credentials) {
    return new Promise<AxiosResponse>(async(resolve, reject) => {
        try {
            const response = await apiClient.post(`/auth/signin`, data);
            resolve(response);
        } catch (error) {
            console.log("AxiosRequestError: ", error);
            reject(error);
        }
    });
}
