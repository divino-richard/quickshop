import { AxiosResponse } from "axios";
import { Category } from "../types/category.types";
import apiClient from "./apiClient";

export const categoryService = {
    create: async (data: Category): Promise<AxiosResponse> => {
        try {
            const result = await apiClient.post('/category', data);
            return result;
        } catch (error) {
            throw error;
        }
    },
    getMany: async (): Promise<AxiosResponse> => {
        try{
            const response = await apiClient.get('/category');
            return response;
        } catch(error) {
            throw error;
        }
    },
}

