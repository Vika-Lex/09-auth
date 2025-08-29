'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import css from './page.module.css';
import {ApiError, loginUser} from "@/lib/api/clientApi";
import {useAuthStore} from "@/lib/store/authStore";

const SignInPage = () => {
    const {setUser} = useAuthStore();
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setError('');
        setIsLoading(true);

        const credentials = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        try {
            const res = await loginUser(credentials);
            if (res) {
                setUser(res);
                router.push('/profile');
            } else {
                setError('Invalid Email or Password');
            }
        } catch (err) {
            setError(
                (err as ApiError).response?.data?.error ??
                (err as ApiError).message ??
                'Oops... some error'
            )
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={css.mainContent}>
            <form
                className={css.form}
                action={handleSubmit}
            >
                <h1 className={css.formTitle}>Sign in</h1>

                <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className={css.input}
                        required
                    />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className={css.input}
                        required
                    />
                </div>

                <div className={css.actions}>
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Log in'}
                    </button>
                </div>

                {error && <p className={css.error}>{error}</p>}
            </form>
        </main>
    );
};

export default SignInPage;