import { TypographyH2 } from '@/components/ui';
import { LoginForm } from '../components/loginForm';
import { AuthLinks } from '../components/auth-links';

export const LoginScreen = () => {
    return (
        <div className="relative w-full h-full">
            <div className="h-screen flex flex-col justify-center items-center w-full p-5">
                <div className="lg:py-20 lg:px-10 px-5 py-10 bg-accent md:w-[500px] w-full rounded-lg shadow-lg flex flex-col items-center gap-5">
                    <TypographyH2 title="Login" className="text-primary" />
                    <LoginForm />
                    <AuthLinks showRegister={true} showForgotPassword={true} />
                </div>
            </div>
        </div>
    );
};
