import { AxiosResponse } from "axios";
import apiClient from "./apiClient";
import { Pagination } from "../components/product/Products";
import { Product } from "../types/poduct.type";

export function getProducts(pagination: Pagination) {
    return new Promise<AxiosResponse>(async(resolve, reject) => {
        try {
            const response = await apiClient.get(`/product/all/${pagination.limit}/${pagination.offset}`);
            resolve(response);
        } catch (error) {
            console.log("AxiosRequestError: ", error);
            reject(error);
        }
    });
}

export function getProductsByUserId(userId: string) {
    return new Promise<AxiosResponse>(async(resolve, reject) => {
        try {
            const response = await apiClient.get(`/product/all/${userId}`);
            resolve(response);
        } catch (error) {
            console.log("AxiosRequestError: ", error);
            reject(error);
        }
    });
}

export function addProduct(product: Product) {
    return new Promise<AxiosResponse>(async(resolve, reject) => {
        try {
            const response = await apiClient.post('/product/', product);
            resolve(response);
        } catch (error) {
            console.log("AxiosRequestError: ", error);
            reject(error);
        }
    });
}
