import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository';
import { useAuthStore } from '@/modules/auth/store/authStore';
import { toast } from '@/lib/toast';
import { messages } from '@/lib/messages';
import type { ApiError } from '@/lib/types';

export const useRegister = () => {
    const { setToken } = useAuthStore();

    return useMutation({
        mutationFn: authRepository.register,

        onSuccess: (res) => {
            const token = res.data?.data?.accessToken;
            setToken(token);
            toast.success(messages.auth.registerSuccess);
        },

        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });
};
