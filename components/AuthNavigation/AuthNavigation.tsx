import Link from 'next/link';
import css from './AuthNavigation.module.css';

const AuthNavigation = () => {
    // TODO: Replace with actual user state/authentication logic
    const isAuthenticated = false;
    const userEmail = "user@example.com";

    if (isAuthenticated) {
        return (
            <>
                <li className={css.navigationItem}>
                    <a href="/profile" className={css.navigationLink}>
                        Profile
                    </a>
                </li>
                <li className={css.navigationItem}>
                    <p className={css.userEmail}>{userEmail}</p>
                    <button className={css.logoutButton}>
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
