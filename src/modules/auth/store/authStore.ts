import { AUTH_ACTIONS, AUTH_STORAGE_KEYS } from '@/modules/auth/constants';
import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
}

interface AuthActions {
    setToken: (token: string) => void;
    logout: () => void;
}

const initialState: AuthState = {
    accessToken: null,
    isAuthenticated: false,
};

export const useAuthStore = create<AuthState & AuthActions>()(
    devtools(
        persist(
            (set) => ({
                ...initialState,

                setToken: (token) =>
                    set(
                        {
                            accessToken: token,
                            isAuthenticated: true,
                        },
                        false,
                        AUTH_ACTIONS.SET_TOKEN,
                    ),

                logout: () => set({ ...initialState }, false, AUTH_ACTIONS.LOGOUT),
            }),
            {
                name: AUTH_STORAGE_KEYS.ROOT,
                storage: createJSONStorage(() => localStorage),
                partialize: (state) => ({
                    accessToken: state.accessToken,
                    isAuthenticated: state.isAuthenticated,
                }),
            },
        ),
        { enabled: true },
    ),
);
