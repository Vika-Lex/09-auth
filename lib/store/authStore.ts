import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {User} from '@/types/user'

type AuthStore = {
    isAuthenticated: boolean;
    user: User | null;
    setUser: (user: User ) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
    devtools(
        persist(
            (set) => ({
                isAuthenticated: false,
                user: null,
                setUser: (user: User) => {
                    set({user, isAuthenticated: true}, false, "setUser")
                },
                clearAuth: () => {
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