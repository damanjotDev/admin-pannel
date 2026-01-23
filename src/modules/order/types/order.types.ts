import type { User } from '@/modules/user/types/user.types';

export interface Order {
    _id: string;
    userId: string;
    amount: number;
    paymentId: string;
    status: string;
    isDeleted: boolean;
    user: User | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface GetOrdersParams {
    page?: number;
    limit?: number;
    userId?: string;
    status?: string;
}

export interface OrderMeta {
    page: number;
    limit: number;
    totalRecords: number;
    totalPages: number;
}

export interface GetOrdersResponse {
    orders: Order[];
    meta: OrderMeta;
}
