import { Button } from '@/components/ui/button';

type HeaderProps = {
    name?: string;
    email?: string;
    userType?: string;
    onLogout: () => void;
};

export const Header = ({ name, email, userType, onLogout }: HeaderProps) => {
    return (
        <header className="flex items-center justify-between px-10 py-6 border-b">
            <h1 className="text-2xl font-semibold">Admin Panel</h1>

            <div className="flex items-center gap-4">
                <div className="flex flex-col text-right">
                    <span className="text-lg font-medium">{name ?? 'Guest User'}</span>
                    <span className="text-sm text-gray-500">{email}</span>
                    <span className="text-sm text-gray-500">{userType?.toUpperCase()}</span>
                </div>

                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
                    {name?.[0] ?? 'U'}
                </div>

                <Button type="button" className="rounded-md bg-red-600 text-white px-4 py-2" onClick={onLogout}>
                    Logout
                </Button>
            </div>
        </header>
    );
};
