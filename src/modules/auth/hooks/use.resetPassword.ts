import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository';
import { toast } from '@/lib/toast';
import { messages } from '@/lib/messages';
import type { ApiError } from '@/lib/types';

export const useResetPassword = () => {
    return useMutation({
        mutationFn: authRepository.resetPassword,

        onSuccess: () => {
            toast.success(messages.auth.resetPasswordSuccess);
        },

        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });
};
