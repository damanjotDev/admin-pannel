import { TypographyH2 } from '@/components/ui';
import { ResetPasswordForm } from '../components/resetPasswordForm';

export const ResetPasswordScreen = () => {
    return (
        <div className="relative w-full h-full">
            <div className="h-screen flex flex-col justify-center items-center w-full p-5">
                <div className="lg:py-20 lg:px-10 px-5 py-10 bg-accent md:w-[500px] w-full rounded-lg shadow-lg flex flex-col items-center gap-5">
                    <TypographyH2 title="Reset password" className="text-primary" />
                    <ResetPasswordForm token={''} />
                </div>
            </div>
        </div>
    );
};
