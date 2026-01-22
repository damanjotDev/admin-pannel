import { useForm, yupResolver } from '@/lib/reactHookForm';
import { Button, Input } from '@/components/ui';
import { Loader2 } from '@/lib/icons';
import { toast } from '@/lib/toast';
import { useResetPassword } from '../hooks/use.resetPassword';
import { resetPasswordValidation } from '../schema/resetPasswordForm.schema';
import type { ResetPasswordFormInput } from '../types/resetPassword.types';

const defaultValues: ResetPasswordFormInput = {
    password: '',
    confirmPassword: '',
};

export const ResetPasswordForm = ({ token }: { token: string }) => {
    const resetPassword = useResetPassword();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ResetPasswordFormInput>({
        defaultValues,
        resolver: yupResolver(resetPasswordValidation),
    });

    const onSubmit = (data: ResetPasswordFormInput) => {
        resetPassword.mutate(
            {
                token,
                password: data.password,
            },
            {
                onSuccess: () => {
                    toast.success('Password reset successfully');
                    reset();
                },
                onError: () => {
                    toast.error('Failed to reset password');
                },
            },
        );
    };

    return (
        <form className="w-full grid grid-cols-1 gap-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Password */}
            <div className="grid w-full items-center gap-1.5">
                <label htmlFor="password" className="text-sm">
                    New Password (required)
                </label>
                <Input
                    disabled={resetPassword.isPending}
                    type="password"
                    id="password"
                    placeholder="New password"
                    {...register('password')}
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="grid w-full items-center gap-1.5">
                <label htmlFor="confirmPassword" className="text-sm">
                    Confirm Password (required)
                </label>
                <Input
                    disabled={resetPassword.isPending}
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    {...register('confirmPassword')}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
            </div>

            <Button
                type="submit"
                className="w-full rounded-none gradient8 text-sm text-white py-3"
                disabled={resetPassword.isPending}
            >
                {resetPassword.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Reset Password
            </Button>
        </form>
    );
};
