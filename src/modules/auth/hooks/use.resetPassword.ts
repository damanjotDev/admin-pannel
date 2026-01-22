// modules/auth/hooks/use-reset-password.ts
import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository';

export const useResetPassword = () => {
    return useMutation({
        mutationFn: authRepository.resetPassword,
    });
};
