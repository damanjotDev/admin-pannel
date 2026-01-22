import { yup } from '@/lib/reactHookForm';

export const resetPasswordValidation = yup.object({
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Must contain at least one number')
        .matches(/[@$!%*?&]/, 'Must contain at least one special character'),

    confirmPassword: yup
        .string()
        .required('Confirm password is required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
});
