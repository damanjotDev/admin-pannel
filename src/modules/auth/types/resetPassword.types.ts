export interface ResetPasswordFormInput {
    password: string;
    confirmPassword: string;
}

export interface ResetPasswordPayload {
    token: string;
    newPassword: string;
}
