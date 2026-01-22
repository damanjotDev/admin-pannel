import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User } from '../types/user.types';
import { USER_ACTIONS } from '../constants';

interface UserState {
    user: User | null;
}

interface UserActions {
    setUser: (user: User) => void;
    clearUser: () => void;
}

const initialState: UserState = {
    user: null,
};

export const useUserStore = create<UserState & UserActions>()(
    devtools(
        (set) => ({
            ...initialState,

            setUser: (user) => set({ user }, false, USER_ACTIONS.SET_USER),

            clearUser: () => set({ user: null }, false, USER_ACTIONS.CLEAR_USER),
        }),
        { enabled: true },
    ),
);
