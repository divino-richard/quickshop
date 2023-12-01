import * as SecureStore from 'expo-secure-store';
import { UserSession } from '../types/user.types';

export const userSession = {
    save: async (key: string, value: UserSession) => {
        const userSession: string = JSON.stringify(value);
        await SecureStore.setItemAsync(key, userSession);
    },
    get: async (key: string): Promise<UserSession | null> => {
        const result =  await SecureStore.getItemAsync(key);
        if(!result) return null
        return JSON.parse(result); 
    },
}
