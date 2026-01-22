import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './protectedRoutes';
import { GuestRoute } from './guestRoutes';

import { MainLayout } from '@/layouts/mainLayout/mainLayout';

import { HomePage } from '@/pages/main/home';
import { LoginPage } from '@/pages/auth/login';
import { RegisterPage } from '@/pages/auth/register';
import { ResetPasswordPage } from '@/pages/auth/resetPassword';
import { ForgotPasswordPage } from '@/pages/auth/forgotPassword';

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        {/* Redirect / → /home */}
                        <Route path="/" element={<Navigate to="/home" replace />} />
                        <Route path="/home" element={<HomePage />} />
                    </Route>
                </Route>

                <Route element={<GuestRoute />}>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
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
