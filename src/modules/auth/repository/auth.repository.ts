// modules/user/repository/user.repository.ts
import * as api from '../api/auth.api';

export const authRepository = {
    login: api.loginApi,
    register: api.registerApi,
    forgotPassword: api.forgotPasswordApi,
    resetPassword: api.resetPasswordApi,
};
