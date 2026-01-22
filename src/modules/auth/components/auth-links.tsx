import { Link } from 'react-router-dom';

type AuthLinksProps = {
  showForgotPassword?: boolean;
  showRegister?: boolean;
  showLogin?: boolean;
};

export const AuthLinks = ({
  showForgotPassword = false,
  showRegister = false,
  showLogin = false,
}: AuthLinksProps) => {
  return (
    <div className="w-full flex flex-col gap-2 text-sm text-center">
      {showForgotPassword && (
        <Link
          to="/forgot-password"
          className="text-primary hover:underline"
        >
          Forgot password?
        </Link>
      )}

      {showRegister && (
        <p className="text-muted-foreground">
          Don’t have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      )}

      {showLogin && (
        <p className="text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      )}
    </div>
  );
};
