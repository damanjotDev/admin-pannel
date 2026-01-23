import { useQuery } from '@tanstack/react-query';
import { orderRepository } from '../repository/order.repository';
import { ORDER_QUERY_KEYS } from '../constants/order';
import type { Order } from '../types/order.types';
import type { ApiError } from '@/lib/types';

export const useCurrentOrder = (orderId: string) => {
    const query = useQuery<Order, ApiError>({
        queryKey: [ORDER_QUERY_KEYS.CURRENT_ORDER, orderId],
        queryFn: () => orderRepository.getOrderById(orderId),
        enabled: !!orderId, // only fetch if orderId exists
        retry: false,
    });

    return query;
};
