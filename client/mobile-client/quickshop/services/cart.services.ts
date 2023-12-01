import { AxiosResponse } from "axios";
import apiClient from "./config.services";

export const cartServices = { 
    add: (productId: string, quantity: number) => {
        return new Promise<AxiosResponse>(async(resolve, reject) => {
            try {
                const response = await apiClient.post('/cart/', {
                    product: productId, 
                    quantity
                });
                resolve(response);
            } catch(error) {
                reject(error);
            }
        });
    },
}
