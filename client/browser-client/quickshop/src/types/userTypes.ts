export interface UserSession {
    data: UserData | null,
    token: string | null
}

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
