import { useQuery } from '@tanstack/react-query';
import { authRepository } from '../repository/auth.repository';
import type { ApiError } from '@/lib/types';
import { AUTH_QUERY_KEYS } from '../constants';

export const useVerifyResetPasswordToken = (token?: string) => {
    return useQuery<any, ApiError>({
        queryKey: [AUTH_QUERY_KEYS.VERIFY_RESET_PASSWORD_TOKEN, token],
        queryFn: () => authRepository.verifyResetPasswordToken(token as string),
        enabled: !!token, // only run when token exists
        retry: false, // don't retry invalid/expired tokens
    });
};
