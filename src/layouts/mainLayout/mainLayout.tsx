import { Outlet } from 'react-router-dom';
import { Header } from './components/header';
import { useMainLayout } from './hooks/use.mainLayout';
import { useCurrentUser } from '@/modules/user/hooks/use.currentUser';

export const MainLayout = () => {
    const { handleLogout } = useMainLayout();
    const currentUserQuery = useCurrentUser();

    return (
        <div className="min-h-screen flex flex-col">
            <Header userQuery={currentUserQuery} onLogout={handleLogout} />

            <main className="flex-1 p-10">
                <Outlet />
            </main>
        </div>
    );
};
