'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './page.module.css';
import {loginUser, RegisterRequest} from "@/lib/api";

const SignInPage = () => {
    const router = useRouter();
    const [error, setError] = useState<string>('');

    const handleSubmit = async (formData: FormData) => {
        setError('');
        const formData = Object.fromEntries(formData) as RegisterRequest;

        try {
            const res = await loginUser(formData);
            if(res) {
                router.push('/');

            } else {
                setError('Invalid email or password');
            }

        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error('Login error:', err);
        }
    };

    return (
        <main className={css.mainContent}>
            <form className={css.form} action={handleSubmit}>
                <h1 className={css.formTitle}>Sign in</h1>

                <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" className={css.input} required />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" className={css.input} required />
                </div>

                <div className={css.actions}>
                    {/*<button type="submit" className={css.submitButton} disabled={isLoading}>*/}
                    {/*    {isLoading ? 'Logging in...' : 'Log in'}*/}
                    {/*</button>*/}
                </div>

                {error && <p className={css.error}>{error}</p>}
            </form>
        </main>
    );
};

export default SignInPage;