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

export function getProduct(productId: string) {
    return new Promise<AxiosResponse>(async(resolve, reject) => {
        try {
            const result = await apiClient.get(`/product/${productId}`);
            resolve(result);
        } catch(error) {
            reject(error);
        }
    });
}

export function searchProduct(searchTerm: string) {
    return new Promise<AxiosResponse>(async(resolve, reject) => {
        try {
            const result = await apiClient.get(`/product/search/${searchTerm}`);
            resolve(result);
        } catch(error) {
            reject(error);
        }
    });
}
