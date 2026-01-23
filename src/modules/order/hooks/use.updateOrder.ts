import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderRepository } from '../repository/order.repository';
import type { Order } from '../types/order.types';
import type { ApiError } from '@/lib/types';
import type { UpdateOrderPayload } from '../types/updateOrder.types';
import { ORDER_QUERY_KEYS } from '../constants/order';
import { toast } from '@/lib/toast';
import { messages } from '@/lib/messages';

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation<Order, ApiError, { orderId: string; payload: UpdateOrderPayload }>({
        mutationKey: [ORDER_QUERY_KEYS.UPDATE_ORDER],
        mutationFn: ({ orderId, payload }) => orderRepository.updateOrder({ orderId, payload }),

        onSuccess: (updatedOrder) => {
            // Update query cache
            queryClient.setQueryData([ORDER_QUERY_KEYS.CURRENT_ORDER, updatedOrder._id], updatedOrder);

            //invalidate order list to refetch fresh data
            queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEYS.ALL_ORDERS] });

            toast.success(messages.order.updateSuccess);
        },

        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });
};
