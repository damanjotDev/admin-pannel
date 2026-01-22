// modules/user/api/user.api.ts

import api from '@/lib/axios';

export const loginApi = (data: any) => api.post('/api/v1/user/login', data).then((res) => res.data);

export const registerApi = (data: any) => api.post('/api/v1/user/register', data).then((res) => res.data);

export const forgotPasswordApi = (data: any) => api.post('/api/v1/user/forget-password', data).then((res) => res.data);

export const resetPasswordApi = (data: any) => api.post('/api/v1/user/reset-password', data).then((res) => res.data);
