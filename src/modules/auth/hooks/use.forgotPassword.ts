import { useMutation } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository';
import { toast } from '@/lib/toast';
import { messages } from '@/lib/messages';
import type { ApiError } from '@/lib/types';
import { AUTH_QUERY_KEYS } from '../constants';

export const useForgotPassword = () => {
    return useMutation({
        mutationKey: [AUTH_QUERY_KEYS.FORGOT_PASSWORD],
        mutationFn: authRepository.forgotPassword,

        onSuccess: () => {
            toast.success(messages.auth.forgotPasswordSuccess);
        },

        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });
};
