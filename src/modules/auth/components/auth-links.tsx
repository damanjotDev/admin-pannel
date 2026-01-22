import { ROUTES } from '@/constants/routes';
import { Link } from 'react-router-dom';

type AuthLinksProps = {
    showForgotPassword?: boolean;
    showRegister?: boolean;
    showLogin?: boolean;
};

export const AuthLinks = ({ showForgotPassword = false, showRegister = false, showLogin = false }: AuthLinksProps) => {
    return (
        <div className="w-full flex flex-col gap-2 text-sm text-center">
            {showForgotPassword && (
                <Link to={ROUTES.FORGOT_PASSWORD} className="text-primary hover:underline">
                    Forgot password?
                </Link>
            )}

            {showRegister && (
                <p className="text-muted-foreground">
                    Don’t have an account?{' '}
                    <Link to={ROUTES.REGISTER} className="text-primary hover:underline">
                        Register
                    </Link>
                </p>
            )}

            {showLogin && (
                <p className="text-muted-foreground">
                    Already have an account?{' '}
                    <Link to={ROUTES.LOGIN} className="text-primary hover:underline">
                        Login
                    </Link>
                </p>
            )}
        </div>
    );
};
