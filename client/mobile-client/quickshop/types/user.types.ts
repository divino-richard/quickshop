export type UserRole = 'ADMIN' | 'CUSTOMER' | 'SELLER'; 

export interface UserData {
    address: string;
    createdAt: Date;
    email: string;
    firstname: string
    lastname: string;
    phoneNumber: number;
    role: UserRole;
    updatedAt: Date;
    __v: number; 
    _id: string;
}

export interface UserSession {
    token: string;
    user: UserData;
}
