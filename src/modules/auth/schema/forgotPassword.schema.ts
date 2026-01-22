import { yup } from '@/lib/reactHookForm';

export const forgotPasswordValidation = yup.object({
    email: yup.string().email('Invalid email address').required('Email is required'),
});