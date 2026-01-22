import { useState } from 'react';
import { useForm, yupResolver } from '@/lib/reactHookForm';
import { Button, Input } from '@/components/ui';
import { Loader2, Eye, EyeOff } from '@/lib/icons';
import { useRegister } from '../hooks/use.register';
import { registerFormValidation } from '../schema/registerForm.schema';
import type { RegisterFormInput } from '../types/registerForm.types';

const defaultValues: RegisterFormInput = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};

export const RegisterForm = () => {
    const registerQuery = useRegister();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RegisterFormInput>({
        defaultValues,
        resolver: yupResolver(registerFormValidation),
    });

    const onSubmit = (data: RegisterFormInput) => {
        registerQuery.mutate(
            {
                name: data.name,
                email: data.email,
                password: data.password,
            },
            {
                onSuccess: () => reset(),
            },
        );
    };

    return (
        <form className="w-full grid grid-cols-1 gap-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="grid w-full items-center gap-1.5">
                <label className="text-sm">Your name (required)</label>
                <Input disabled={registerQuery.isPending} placeholder="Name" {...register('name')} />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="grid w-full items-center gap-1.5">
                <label className="text-sm">Email address (required)</label>
                <Input disabled={registerQuery.isPending} placeholder="Email" {...register('email')} />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="grid w-full items-center gap-1.5 relative">
                <label className="text-sm">Password (required)</label>
                <Input
                    disabled={registerQuery.isPending}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    {...register('password')}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="p-0 absolute right-3 top-[38px] text-gray-500"
                    tabIndex={-1}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                <p className="text-xs text-muted-foreground">Min 8 chars, uppercase, lowercase, number & symbol</p>
            </div>

            {/* Confirm Password */}
            <div className="grid w-full items-center gap-1.5">
                <label className="text-sm">Confirm Password (required)</label>
                <Input
                    disabled={registerQuery.isPending}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    {...register('confirmPassword')}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
            </div>

            {/* Submit */}
            <Button
                type="submit"
                className="w-full rounded-none gradient8 text-sm text-white py-3"
                disabled={registerQuery.isPending}
            >
                {registerQuery.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Register
            </Button>
        </form>
    );
};
