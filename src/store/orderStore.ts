import api from '@/lib/axios';
import type { Order, User } from '@/lib/types';
import { toast } from 'sonner';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type OrderAction = 'submitOrder' | 'getOrders' | 'updateOrders';

export interface OrdersResponse {
    orders: Order[];
    metaData: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    statusCounts: {
        admin: {
            pending: number;
            processing: number;
            completed: number;
        };
        executive: {
            pending: number;
            processing: number;
            completed: number;
        };
    };
}

export interface OrderFormInput {
    userName: string;
    profileUrl: string;
    webUrl: string | null;
    reviewPerWeek: string;
    reviewRating: number;
    reviewDescription: string | null;
    reviewContent: string | null;
}

interface OrderState {
    orderDetails: Order | null;
    orders: OrdersResponse;
    isLoading: Partial<Record<OrderAction, boolean>>;
    error: Partial<Record<OrderAction, string | null>>;
}

interface OrderActions {
    reset: () => void;
    submitOrder: (data: OrderFormInput) => Promise<void>;
    getOrders: (params: {
        filterObj: { page: number; limit: number; adminStatus: string; executiveStatus: string };
    }) => Promise<void>;
    updateOrders: (id: string, payload: Partial<Order>) => Promise<void>;
}

const orderInitialState: OrderState = {
    orderDetails: null,
    orders: {
        orders: [],
        metaData: {
            total: 0,
            page: 0,
            limit: 0,
            totalPages: 0,
        },
        statusCounts: {
            admin: {
                pending: 0,
                processing: 0,
                completed: 0,
            },
            executive: {
                pending: 0,
                processing: 0,
                completed: 0,
            },
        },
    },
    isLoading: {},
    error: {},
};

export const useOrderStore = create<OrderState & OrderActions>()(
    persist(
        (set, get) => ({
            ...orderInitialState,

            //normal actions
            reset: (): void => {
                set((state) => ({
                    ...state,
                }));
            },

            //async functions
            submitOrder: async (payload: OrderFormInput) => {
                set((state) => ({
                    isLoading: { ...state.isLoading, submitOrder: true },
                    error: { ...state.error, submitOrder: null },
                }));
                try {
                    const { data } = await api.post('/api/v1/order/create', payload);
                    set({
                        isLoading: { ...get().isLoading, submitOrder: false },
                    });
                    toast.success('Form Submitted Successfully!');
                } catch (err: any) {
                    toast.error(err?.response?.data?.message || 'something went wrong');
                    set({
                        error: { ...get().error, submitOrder: 'error' },
                        isLoading: { ...get().isLoading, submitOrder: false },
                    });
                    throw err;
                }
            },
            updateOrders: async (id, payload) => {
                set((state) => ({
                    isLoading: { ...state.isLoading, updateOrders: true },
                    error: { ...state.error, updateOrders: null },
                }));
                try {
                    const { data } = await api.put(`/api/v1/order/update/${id}`, payload);
                    set({
                        isLoading: { ...get().isLoading, updateOrders: false },
                    });
                } catch (err: any) {
                    toast.error(err?.response?.data?.message || 'something went wrong');
                    set({
                        error: { ...get().error, updateOrders: 'error' },
                        isLoading: { ...get().isLoading, updateOrders: false },
                    });
                    throw err;
                }
            },

            getOrders: async (payload) => {
                set((state) => ({
                    isLoading: { ...state.isLoading, getOrders: true },
                    error: { ...state.error, getOrders: null },
                }));
                try {
                    const { data } = await api.get(`/api/v1/order/orders`, payload.filterObj);
                    const orders = {
                        orders: data.data.orders,
                        metaData: data.data.meta,
                        statusCounts: data.data.statusCounts,
                    } as OrdersResponse;
                    set({
                        orders: orders,
                        isLoading: { ...get().isLoading, getOrders: false },
                    });
                } catch (err: any) {
                    toast.error(err?.response?.data?.message || 'something went wrong');
                    set({
                        error: { ...get().error, getOrders: 'error' },
                        isLoading: { ...get().isLoading, getOrders: false },
                    });
                    throw err;
                }
            },
        }),
        {
            name: 'order-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => {
                const { isLoading, error, ...persistedState } = state;
                return persistedState;
            },
        },
    ),
);
