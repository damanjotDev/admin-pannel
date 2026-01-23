import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderRepository } from '../repository/order.repository';
import type { ApiError } from '@/lib/types';
import { ORDER_QUERY_KEYS } from '../constants/order';
import { toast } from '@/lib/toast';
import { messages } from '@/lib/messages';

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();

    return useMutation<void, ApiError, string>({
        mutationKey: [ORDER_QUERY_KEYS.DELETE_ORDER],
        mutationFn: (orderId: string) => orderRepository.deleteOrder(orderId),

        onSuccess: (_, orderId) => {
            // Remove from React Query cache
            queryClient.removeQueries({ queryKey: [ORDER_QUERY_KEYS.CURRENT_ORDER, orderId] });

            // Invalidate order list to refetch fresh data
            queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEYS.ALL_ORDERS] });

            toast.success(messages.order.deleteSuccess);
        },

        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });
};
