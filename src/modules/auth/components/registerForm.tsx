import { useForm, yupResolver, yup } from '@/lib/reactHookForm';
import { Button, Input } from '@/components/ui';
import { Loader2 } from '@/lib/icons';
import { useRegister } from '../hooks/use.register';
import { toast } from '@/lib/toast';
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
                onSuccess: () => {
                    reset();
                },
            },
        );
    };

    return (
        <form className="w-full grid grid-cols-1 gap-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="grid w-full items-center gap-1.5">
                <label htmlFor="email" className="text-sm">
                    Your name (required)
                </label>
                <Input disabled={registerQuery.isPending} id="name" placeholder="Name" {...register('name')} />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="grid w-full items-center gap-1.5">
                <label htmlFor="email" className="text-sm">
                    Email address (required)
                </label>
                <Input disabled={registerQuery.isPending} id="email" placeholder="Email" {...register('email')} />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="grid w-full items-center gap-1.5">
                <label htmlFor="password" className="text-sm">
                    Password (required)
                </label>
                <Input
                    disabled={registerQuery.isPending}
                    type="password"
                    id="password"
                    placeholder="Password"
                    {...register('password')}
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                <p className="text-xs text-muted-foreground">Min 8 chars, uppercase, lowercase, number & symbol</p>
            </div>

            {/* Confirm Password */}
            <div className="grid w-full items-center gap-1.5">
                <label htmlFor="confirmPassword" className="text-sm">
                    Confirm Password (required)
                </label>
                <Input
                    disabled={registerQuery.isPending}
                    type="password"
                    id="confirmPassword"
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
