"use client"

import {ReactNode, useEffect} from "react";
import {useAuthStore} from "@/lib/store/authStore";
import {checkSession, getCurrentUser} from "@/lib/api/clientApi";

interface Props {
    children: ReactNode
}

const AuthProvider = ({children}: Props) => {
    const {setUser,clearIsAuthenticated,isAuthenticated,user} = useAuthStore()

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
                    clearIsAuthenticated()
                }
            } catch {
                clearIsAuthenticated()
            }
        }
        fetchUser();
    }, [setUser, clearIsAuthenticated])

    return children;
}

export default AuthProvider;