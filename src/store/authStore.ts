import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
    persist(
        (set) => ({
            ...initialState,

            setToken: (token) =>
                set({
                    accessToken: token,
                    isAuthenticated: true,
                }),

            logout: () =>
                set({
                    ...initialState,
                }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                accessToken: state.accessToken,
                isAuthenticated: state.isAuthenticated,
            }),
        },
    ),
);
