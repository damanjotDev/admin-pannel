import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { TypographyH2, Button } from '@/components/ui';
import { ResetPasswordForm } from '../components/resetPasswordForm';
import { useVerifyResetPasswordToken } from '../hooks/use.verifyResetPasswordToken';
import { Loader2 } from '@/lib/icons';
import { ROUTES } from '@/constants/routes';

export const ResetPasswordScreen = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    if (!token) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    const { isLoading, isError, error } = useVerifyResetPasswordToken(token);

    // Loading
    if (isLoading) {
        return (
            <div className="relative w-full h-full">
                <div className="h-screen flex flex-col justify-center items-center w-full p-5">
                    <div className="lg:py-20 lg:px-10 px-5 py-10 bg-accent md:w-[500px] w-full rounded-lg shadow-lg flex flex-col items-center gap-5">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">Verifying reset link...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error
    if (isError) {
        return (
            <div className="relative w-full h-full">
                <div className="h-screen flex flex-col justify-center items-center w-full p-5">
                    <div className="lg:py-20 lg:px-10 px-5 py-10 bg-accent md:w-[500px] w-full rounded-lg shadow-lg flex flex-col items-center gap-5">
                        <TypographyH2 title="Invalid or expired link" className="text-destructive" />
                        <p className="text-sm text-muted-foreground text-center">
                            {error?.message || 'This reset password link is no longer valid.'}
                        </p>
                        <Button variant="outline" onClick={() => navigate(ROUTES.FORGOT_PASSWORD, { replace: true })}>
                            Request new link
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Success
    return (
        <div className="relative w-full h-full">
            <div className="h-screen flex flex-col justify-center items-center w-full p-5">
                <div className="lg:py-20 lg:px-10 px-5 py-10 bg-accent md:w-[500px] w-full rounded-lg shadow-lg flex flex-col items-center gap-5">
                    <TypographyH2 title="Reset password" className="text-primary" />
                    <ResetPasswordForm token={token} />
                </div>
            </div>
        </div>
    );
};
