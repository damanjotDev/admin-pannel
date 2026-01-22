import type { UseQueryResult } from '@tanstack/react-query';
import type { User } from '@/modules/user/types/user.types';
import type { ApiError } from '@/lib/types';
import { UserInfo } from '@/layouts/mainLayout/components/userInfo';

interface HeaderProps {
    userQuery: UseQueryResult<User, ApiError>;
    onLogout: () => void;
}

export const Header = ({ userQuery, onLogout }: HeaderProps) => {
    const { data: user, isLoading, isError } = userQuery;

    const renderContent = () => {
        if (isLoading) return <span className="text-sm text-muted">Loading user...</span>;
        if (isError) return <span className="text-sm text-red-500">Failed to load user</span>;
        if (user) return <UserInfo user={user} onLogout={onLogout} />;
        return null; // fallback
    };

    return (
        <header className="h-16 flex items-center justify-between px-6 border-b">
            <h1 className="font-semibold">My App</h1>
            <div>{renderContent()}</div>
        </header>
    );
};
