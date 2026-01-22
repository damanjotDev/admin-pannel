import { useAuthStore } from '@/modules/auth/store/authStore';

export const useMainLayout = () => {
    const { isAuthenticated, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
    };

    return {
        isAuthenticated,
        handleLogout,
    };
};
