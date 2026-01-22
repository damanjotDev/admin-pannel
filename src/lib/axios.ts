import axios from 'axios';
import type { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

import { parseApiError } from './parseApiError';
import { useAuthStore } from '@/modules/auth/store/authStore';
import { toast } from '@/lib/toast';
import { envConfig } from '@/config/envConfig';

interface ApiConfig {
    baseURL: string;
    timeout: number;
    headers?: any;
}

const apiConfig: ApiConfig = {
    baseURL: envConfig().VITE_API_BASE_URL,
    timeout: envConfig().VITE_API_TIMEOUT,
};

const axiosInstance: any = axios.create(apiConfig);

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        //@ts-ignore
        const status = error?.status || error.response?.data?.status;

        if (status === 401) {
            useAuthStore.getState().logout();
            toast.error('Session expired!');
        }

        return Promise.reject(parseApiError(error));
    },
);

// API methods
const api = {
    // GET request
    get: <T>(url: string, filters?: Record<string, any>): Promise<any> => {
        return axiosInstance.get(url, { params: filters });
    },

    // POST request
    post: <T>(url: string, data: any): Promise<any> => axiosInstance.post(url, data),

    // PUT request
    put: <T>(url: string, data: any): Promise<any> => axiosInstance.put(url, data),

    // DELETE request
    delete: (url: string): Promise<any> => axiosInstance.delete(url),
};

export default api;
