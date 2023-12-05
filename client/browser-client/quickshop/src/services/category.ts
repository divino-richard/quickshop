import { AxiosResponse } from "axios";
import { Category } from "../types/category.types";
import apiClient from "./apiClient";

const jsonApiClient = apiClient('application/json');

export const categoryService = {
    create: async (data: Category): Promise<AxiosResponse> => {
        try {
            const result = await jsonApiClient.post('/category', data);
            return result;
        } catch (error) {
            throw error;
        }
    },
    getMany: async (): Promise<AxiosResponse> => {
        try{
            const response = await jsonApiClient.get('/category');
            return response;
        } catch(error) {
            throw error;
        }
    },
}

