//@ts-ignore
import axios from 'axios';
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

axiosInstance.interceptors.request.use(async (req: any) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            req.headers.Authorization = `Bearer ${accessToken}`;
        }
        return req;
    } catch (error) {
        console.error('error', error);
    }
});

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
