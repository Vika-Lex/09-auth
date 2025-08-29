"use client"
import css from './AuthNavigation.module.css';
import {useAuthStore} from "@/lib/store/authStore";
import {logoutUser} from "@/lib/api/clientApi";
import {useRouter} from "next/navigation";
import Link from 'next/link';

const AuthNavigation = () => {
    const {isAuthenticated, user, clearIsAuthenticated} = useAuthStore()
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logoutUser();
            clearIsAuthenticated();
            router.push("/sign-in");
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    if (isAuthenticated) {
        return (
            <>
                <li className={css.navigationItem}>
                    <Link href="/profile" className={css.navigationLink}>
                        Profile
                    </Link>
                </li>
                <li className={css.navigationItem}>
                    <p className={css.userEmail}>{user?.email}</p>
                    <button className={css.logoutButton} onClick={handleLogout}>
                        Logout
                    </button>
                </li>
            </>
        );
    }

    return (
        <>
            <li className={css.navigationItem}>
                <Link href="/sign-in" className={css.navigationLink}>
                    Sign in
                </Link>
            </li>
            <li className={css.navigationItem}>
                <Link href="/sign-up" className={css.navigationLink}>
                    Sign up
                </Link>
            </li>
        </>
    );
};

export default AuthNavigation;