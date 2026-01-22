import api from '@/lib/axios';
import type { ApiSuccessResponse } from '@/lib/types';
import type { User } from '../types/user.types';
import type { UpdateUserPayload } from '../types/updateUser.types';

export const getCurrentUserApi = () =>
    api.get<ApiSuccessResponse<User>>(`/api/v1/user/get-profile`).then((res) => res.data);

export const updateUserApi = (payload: UpdateUserPayload) =>
    api.put<ApiSuccessResponse<User>>('/api/v1/user/update', payload).then((res) => res.data);
