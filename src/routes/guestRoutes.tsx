import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/modules/auth/store/authStore';

export const GuestRoute = () => {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};
