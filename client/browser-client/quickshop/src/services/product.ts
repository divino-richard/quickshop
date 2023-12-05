import { AxiosResponse } from "axios";
import apiClient from "./apiClient";
import { Pagination } from "../components/product/ProductList";

const jsonApiClient = apiClient('application/json');
const formDataApiClient = apiClient('multipart/form-data');

const productService = {
    getProducts: async(pagination: Pagination): Promise<AxiosResponse> => {
        try {
            const response = await jsonApiClient.get(`/product/all/${pagination.limit}/${pagination.offset}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    getProductsByUserId: async (userId: string): Promise<AxiosResponse> => {
        try {
            const response = await jsonApiClient.get(`/product/all/${userId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    addProduct: async (product: FormData): Promise<AxiosResponse> => {
        try {
            const response = await formDataApiClient.post('/product/', product);
            return response;
        } catch (error) {
            throw error;
        }
    },
    deleteProduct: async (productId: string) => {
        try {
            const response = await jsonApiClient.delete(`/product/${productId}`);
            return response;
        } catch(error) {
            throw error;
        }
    }
}

export default productService;
