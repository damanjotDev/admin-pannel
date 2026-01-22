import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository';
import { useAuthStore } from '@/modules/auth/store/authStore';
import { toast } from '@/lib/toast';
import { messages } from '@/lib/messages';
import type { ApiError } from '@/lib/types';
import { AUTH_QUERY_KEYS } from '../constants';

export const useRegister = () => {
    const { setToken } = useAuthStore();

    return useMutation({
        mutationKey: [AUTH_QUERY_KEYS.REGISTER],
        mutationFn: authRepository.register,

        onSuccess: (res) => {
            const token = res.data?.accessToken;
            setToken(token);
            toast.success(messages.auth.registerSuccess);
        },

        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });
};
