import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {User} from '@/types/user'

type AuthStore = {
    isAuthenticated: boolean;
    user: User | null;
    setUser: (user: User) => void;
    clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()(
    devtools(
        persist(
            (set) => ({
                isAuthenticated: false,
                user: null,
                setUser: (user: User | null) => {
                    set({user, isAuthenticated: true}, false, "setUser")
                },
                clearIsAuthenticated: () => {
                    set({user: null, isAuthenticated: false}, false, "clearAuth")
                },
            }),
            {
                name: 'auth-storage',
            }
        ),
        {
            name: 'auth-store',
        }
    )
)