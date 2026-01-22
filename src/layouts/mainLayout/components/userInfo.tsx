import type { User } from '@/modules/user/types/user.types';
import { Button } from '@/components/ui';

export const UserInfo = ({ user, onLogout }: { user: User; onLogout: () => void }) => (
    <div className="flex items-center gap-3">
        <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>

        <Button size="sm" onClick={onLogout}>
            Logout
        </Button>
    </div>
);
