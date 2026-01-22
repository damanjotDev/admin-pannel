import { Outlet } from 'react-router-dom';
import { Header } from './components/header';
import { useMainLayout } from './hooks/use.mainLayout';

export const MainLayout = () => {
    const { user, handleLogout } = useMainLayout();

    return (
        <div className="min-h-screen flex flex-col">
            <Header name={user?.name} email={user?.email} userType={user?.userType} onLogout={handleLogout} />

            <main className="flex-1 p-10">
                <Outlet />
            </main>
        </div>
    );
};
