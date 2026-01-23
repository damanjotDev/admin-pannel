import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { orderRepository } from '../repository/order.repository';
import { ORDER_QUERY_KEYS } from '../constants/order';
import type { ApiError } from '@/lib/types';
import type { GetOrdersParams, GetOrdersResponse } from '../types/order.types';

type OrdersQueryKey = readonly [typeof ORDER_QUERY_KEYS.ALL_ORDERS, GetOrdersParams?];

export const useOrders = (params?: GetOrdersParams) => {
    const queryKey: OrdersQueryKey = [ORDER_QUERY_KEYS.ALL_ORDERS, params];

    const options: UseQueryOptions<GetOrdersResponse, ApiError, GetOrdersResponse, OrdersQueryKey> = {
        queryKey,
        queryFn: () => orderRepository.getOrders(params),
        retry: false,
        staleTime: 1000, //keep old data for 1s
    };

    return useQuery<GetOrdersResponse, ApiError, GetOrdersResponse, OrdersQueryKey>(options);
};
