import api from '@/lib/axios';
import type { ApiSuccessResponse } from '@/lib/types';
import type { GetOrdersParams, GetOrdersResponse, Order } from '../types/order.types';
import type { CreateOrderPayload } from '../types/createOrder.types';
import type { UpdateOrderPayload } from '../types/updateOrder.types';

export const createOrderApi = (payload: CreateOrderPayload) =>
    api.post<ApiSuccessResponse<Order>>('/api/v1/order/create-order', payload).then((res) => res.data);

export const getAllOrdersApi = (params?: GetOrdersParams) =>
    api.get<ApiSuccessResponse<GetOrdersResponse>>('/api/v1/order/get-orders', params).then((res) => res.data);

export const getOrderByIdApi = (id: string) =>
    api.get<ApiSuccessResponse<Order>>(`/api/v1/order/${id}`).then((res) => res.data);

export const updateOrderApi = (payload: { orderId: string; payload: UpdateOrderPayload }) =>
    api
        .put<ApiSuccessResponse<Order>>(`/api/v1/order/update-order/${payload.orderId}`, { ...payload.payload })
        .then((res) => res.data);

export const deleteOrderApi = (id: string) =>
    api.delete(`/api/v1/order/delete-order/${id}`).then((res) => res.data);
