import * as api from '../api/user.api';
import type { UpdateUserPayload } from '../types/updateUser.types';
import type { User } from '../types/user.types';

export const userRepository = {
    getCurrentUser: async (): Promise<User> => {
        const response = await api.getCurrentUserApi();
        return response.data;
    },

    updateUser: async (payload: UpdateUserPayload): Promise<User> => {
        const res = await api.updateUserApi(payload);
        return res;
    },
};
