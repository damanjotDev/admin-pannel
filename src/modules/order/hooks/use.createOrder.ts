import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderRepository } from '../repository/order.repository';
import type { Order } from '../types/order.types';
import type { ApiError } from '@/lib/types';
import type { CreateOrderPayload } from '../types/createOrder.types';
import { ORDER_QUERY_KEYS } from '../constants/order';
import { toast } from '@/lib/toast';
import { messages } from '@/lib/messages';

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation<Order, ApiError, CreateOrderPayload>({
        mutationKey: [ORDER_QUERY_KEYS.CREATE_ORDER],
        mutationFn: (payload) => orderRepository.createOrder(payload),

        onSuccess: () => {
            // Invalidate order list to refetch and include new order
            queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEYS.ALL_ORDERS] });
            toast.success(messages.order.createSuccess);
        },

        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });
};
