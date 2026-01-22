import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export const useMainLayout = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(() => navigate('/login'));
    };

    return {
        user,
        handleLogout,
    };
};
