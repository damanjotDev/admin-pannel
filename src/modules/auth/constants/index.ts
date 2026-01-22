export const AUTH_ACTIONS = {
    SET_TOKEN: 'auth/setToken',
    LOGOUT: 'auth/logout',
} as const;

export const AUTH_STORAGE_KEYS = {
    ROOT: 'auth-storage',
} as const;

export const AUTH_QUERY_KEYS = {
    VERIFY_RESET_PASSWORD_TOKEN: 'auth/verify-reset-password-token',
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    FORGOT_PASSWORD: 'auth/forgot-password',
    RESET_PASSWORD: 'auth/reset-password',
} as const;
