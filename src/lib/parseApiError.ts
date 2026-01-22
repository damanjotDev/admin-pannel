import type { AxiosError } from 'axios';
import type { ApiError } from '@/lib/types';

export const parseApiError = (error: unknown): ApiError => {
    // Axios error
    if (isAxiosError(error)) {
        return {
            message: error.response?.data?.message ?? error.message ?? 'Something went wrong',
            status: error.response?.status,
        };
    }

    // Native JS Error
    if (error instanceof Error) {
        return {
            message: error.message,
        };
    }

    // Fallback
    return {
        message: 'Something went wrong',
    };
};

// Type guard
const isAxiosError = (error: unknown): error is AxiosError<any> => {
    return typeof error === 'object' && error !== null && 'isAxiosError' in error;
};
