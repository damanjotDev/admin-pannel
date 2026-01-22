import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './protectedRoutes';
import { GuestRoute } from './guestRoutes';

import { MainLayout } from '@/layouts/mainLayout/mainLayout';

import { HomePage } from '@/pages/main/home';
import { LoginPage } from '@/pages/auth/login';
import { RegisterPage } from '@/pages/auth/register';
import { ResetPasswordPage } from '@/pages/auth/resetPassword';
import { ForgotPasswordPage } from '@/pages/auth/forgotPassword';
import { ROUTES } from '@/constants/routes';

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        {/* Redirect / → /home */}
                        <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.HOME} replace />} />
                        <Route path={ROUTES.HOME} element={<HomePage />} />
                    </Route>
                </Route>

                <Route element={<GuestRoute />}>
                    <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.LOGIN} replace />} />
                    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                    <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                    <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
                    <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
                </Route>

                <Route
                    path="*"
                    element={
                        <div className="flex items-center justify-center min-h-screen">
                            <h1 className="text-4xl">Not found</h1>
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};
