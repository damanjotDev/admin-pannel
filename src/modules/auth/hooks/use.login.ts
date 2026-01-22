// modules/auth/hooks/use-login.ts
import { useAuthStore } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository';

export const useLogin = () => {
    const { setToken } = useAuthStore();

    return useMutation({
        mutationFn: authRepository.login,

        onSuccess: (res) => {
            const token = res.data?.data?.accessToken;
            setToken(token);
        },
    });
};
