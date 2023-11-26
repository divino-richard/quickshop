import axios, { AxiosResponse } from "axios";
import apiClient from "./config.services";

export function getProducts() {
    return new Promise<AxiosResponse>(async(resolve, reject) => {
        try {
            const result = await apiClient.get('/product/all/10/0');
            resolve(result);
        } catch(error) {
            reject(error);
        }
    });
}
