// modules/auth/hooks/use-forgot-password.ts
import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository';

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: authRepository.forgotPassword,
    });
};
