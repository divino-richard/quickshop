import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

interface Credentials {
    email: string;
    password: string;
}

const jsonApiClient = apiClient('application/json');

export function loginUser(data: Credentials) {
    return new Promise<AxiosResponse>(async(resolve, reject) => {
        try {
            const response = await jsonApiClient.post(`/auth/signin`, data);
            resolve(response);
        } catch (error) {
            console.log("AxiosRequestError: ", error);
            reject(error);
        }
    });
}
