import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/modules/auth/store/authStore';
import { authRepository } from '../repository/auth.repository';
import { toast } from '@/lib/toast';
import { messages } from '@/lib/messages';
import type { ApiError } from '@/lib/types';
import { AUTH_QUERY_KEYS } from '../constants';

export const useLogin = () => {
    const { setToken } = useAuthStore();

    return useMutation({
        mutationKey: [AUTH_QUERY_KEYS.LOGIN],
        mutationFn: authRepository.login,

        onSuccess: (res) => {
            const token = res.data?.accessToken;
            setToken(token);
            toast.success(messages.auth.loginSuccess);
        },

        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });
};
