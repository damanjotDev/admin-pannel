export interface User {
    _id: string;
    name: string;
    email: string;
    userType: 'admin' | 'user';
    lastLoginAt: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    accessToken: string;
}
