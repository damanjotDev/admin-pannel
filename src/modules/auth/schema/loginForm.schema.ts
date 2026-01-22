import { yup } from "@/lib/reactHookForm";

export const loginFormValidation = yup.object().shape({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
});
