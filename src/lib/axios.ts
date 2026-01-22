import axios from 'axios';
import type { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

import { parseApiError } from './parseApiError';
interface ApiConfig {
    baseURL: string;
    timeout: number;
    headers?: any;
}

const apiConfig: ApiConfig = {
    baseURL: 'https://adaired-server.vercel.app',
    timeout: 1000000,
};

const axiosInstance: any = axios.create(apiConfig);

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => Promise.reject(parseApiError(error)),
);

// API methods
const api = {
    // GET request
    get: <T>(url: string, filters?: Record<string, any>): Promise<any> => {
        return axiosInstance.get(url, { params: filters });
    },

    // POST request
    post: (url: string, data: any): Promise<any> => axiosInstance.post(url, data),

    // PUT request
    put: (url: string, data: any): Promise<any> => axiosInstance.put(url, data),

    // DELETE request
    delete: (url: string): Promise<any> => axiosInstance.delete(url),
};

export default api;
