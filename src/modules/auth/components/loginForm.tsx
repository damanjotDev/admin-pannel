import { useForm, yup, yupResolver } from '@/lib/reactHookForm';
import { Button, Input } from '@/components/ui';
import { Loader2 } from '@/lib/icons';
import { useLogin } from '../hooks/use.login';
import { toast } from '@/lib/toast';
import { loginFormValidation } from '../schema/loginForm.schema';
import type { LoginFormInput } from '../types/loginForm.types';

const defaultValues: LoginFormInput = {
    email: '',
    password: '',
};

export const LoginForm = () => {
    const login = useLogin();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormInput>({
        defaultValues,
        resolver: yupResolver(loginFormValidation),
    });

    const onSubmit = (data: LoginFormInput) => {
        login.mutate(
            {
                email: data.email,
                password: data.password,
            },
            {
                onSuccess: () => {
                    reset();
                    toast.success('user registered successfully!');
                },
                onError: (error) => {
                    toast.error('registration faild!');
                },
            },
        );
    };

    return (
        <form className="w-full grid grid-cols-1 gap-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="grid w-full items-center gap-1.5">
                <label htmlFor="email" className="text-sm">
                    Email address (required)
                </label>
                <Input disabled={login.isPending} type="text" id="email" placeholder="Mail*" {...register('email')} />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="grid w-full items-center gap-1.5">
                <label htmlFor="password" className="text-sm">
                    Password (required)
                </label>
                <Input
                    disabled={login.isPending}
                    type="password"
                    id="password"
                    placeholder="Your password"
                    {...register('password')}
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            <Button
                type="submit"
                className="w-full rounded-none gradient8 text-sm text-white py-3"
                disabled={login.isPending}
            >
                {login.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
            </Button>
        </form>
    );
};
