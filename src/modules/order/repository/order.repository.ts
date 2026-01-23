import * as api from '../api/order.api';
import type { GetOrdersParams, GetOrdersResponse, Order } from '../types/order.types';
import type { CreateOrderPayload } from '../types/createOrder.types';
import type { UpdateOrderPayload } from '../types/updateOrder.types';

export const orderRepository = {
    createOrder: async (payload: CreateOrderPayload): Promise<Order> => {
        const res = await api.createOrderApi(payload);
        return res.data;
    },

    getOrders: async (params?: GetOrdersParams): Promise<GetOrdersResponse> => {
        const res = await api.getAllOrdersApi(params);
        return res.data;
    },

    getOrderById: async (orderId: string): Promise<Order> => {
        const res = await api.getOrderByIdApi(orderId);
        return res.data;
    },

    updateOrder: async (payload: { orderId: string; payload: UpdateOrderPayload }): Promise<Order> => {
        const res = await api.updateOrderApi(payload);
        return res.data;
    },

    deleteOrder: async (orderId: string): Promise<void> => {
        await api.deleteOrderApi(orderId);
    },
};
