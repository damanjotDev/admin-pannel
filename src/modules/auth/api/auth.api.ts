import api from '@/lib/axios';
import type { ResetPasswordPayload } from '../types/resetPassword.types';

export const loginApi = (data: any) => api.post('/api/v1/user/login', data).then((res) => res.data);

export const registerApi = (data: any) => api.post('/api/v1/user/register', data).then((res) => res.data);

export const forgotPasswordApi = (data: any) => api.post('/api/v1/user/forgot-password', data).then((res) => res.data);

export const resetPasswordApi = ({ token, newPassword }: ResetPasswordPayload) =>
    api.post(`/api/v1/user/reset-password/${token}`, { newPassword }).then((res) => res.data);
export const verifyResetPasswordTokenApi = (token: string) =>
    api.get(`/api/v1/user/verify-reset-password-token/${token}`).then((res) => res.data);
