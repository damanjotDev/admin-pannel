import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/modules/auth/store/authStore';

export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
