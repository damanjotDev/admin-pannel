import { useForm, yupResolver } from '@/lib/reactHookForm';
import { Button, Input } from '@/components/ui';
import { Loader2 } from '@/lib/icons';
import { toast } from '@/lib/toast';
import { useForgotPassword } from '../hooks/use.forgotPassword';
import type { ForgotPasswordFormInput } from '../types/forgotPassword.types';
import { forgotPasswordValidation } from '../schema/forgotPassword.schema';

const defaultValues: ForgotPasswordFormInput = {
    email: '',
};

export const ForgotPasswordForm = () => {
    const forgotPasswordQuery = useForgotPassword();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ForgotPasswordFormInput>({
        defaultValues,
        resolver: yupResolver(forgotPasswordValidation),
    });

    const onSubmit = (data: ForgotPasswordFormInput) => {
        forgotPasswordQuery.mutate(
            { email: data.email },
            {
                onSuccess: () => {
                    toast.success('Password reset link sent to your email');
                    reset();
                },
                onError: () => {
                    toast.error('Failed to send reset link');
                },
            },
        );
    };

    return (
        <form className="w-full grid grid-cols-1 gap-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-1.5">
                <label htmlFor="email" className="text-sm">
                    Email address (required)
                </label>
                <Input disabled={forgotPasswordQuery.isPending} id="email" placeholder="Email" {...register('email')} />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <Button
                type="submit"
                className="w-full rounded-none gradient8 text-sm text-white py-3"
                disabled={forgotPasswordQuery.isPending}
            >
                {forgotPasswordQuery.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Reset Link
            </Button>
        </form>
    );
};
