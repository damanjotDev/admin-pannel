// modules/auth/hooks/use-register.ts
import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository';
import { useAuthStore } from '@/store/authStore';

export const useRegister = () => {
    const { setToken } = useAuthStore();

    return useMutation({
        mutationFn: authRepository.register,

        onSuccess: (res) => {
            const token = res.data?.data?.accessToken;
            setToken(token);
        },
    });
};
