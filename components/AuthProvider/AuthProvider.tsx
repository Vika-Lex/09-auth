"use client"

import {ReactNode, useEffect} from "react";
import {useAuthStore} from "@/lib/store/authStore";
import {checkSession, getCurrentUser} from "@/lib/api/clientApi";

interface Props {
    children: ReactNode
}

const AuthProvider = ({children}: Props) => {
    const {setUser,clearAuth,} = useAuthStore()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const sessionData = await checkSession();
                if (sessionData.authenticated) {
                    if (sessionData.user) {
                        setUser(sessionData.user);
                    } else {
                        const user = await getCurrentUser();
                        if (user) setUser(user);
                    }
                } else {
                    clearAuth()
                }
            } catch {
                clearAuth()
            }
        }
        fetchUser();
    }, [setUser, clearAuth])

    return children;
}

export default AuthProvider;