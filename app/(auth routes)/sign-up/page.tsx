'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './page.module.css';
import {RegisterRequest, registerUser} from "@/lib/api";

const SignUpPage = () => {
    const router = useRouter();
    const [error, setError] = useState<string>('');

    const handleSubmit = async (formData: FormData) => {
        setError('');

        const formValues = Object.fromEntries(formData) as RegisterRequest;

        try {
            const res = await registerUser(formValues);
           if(res) {
               router.push('/');

           } else {
               setError('Invalid email or password');
           }

        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error('Registration error:', err);
        }
    };

    return (
        <div className={css.mainContent}>
            <h1 className={css.formTitle}>Sign up</h1>
            <form className={css.form} action={handleSubmit}>

                <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" className={css.input} required />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" className={css.input} required />
                </div>

                <div className={css.actions}>
                    <button type="submit" className={css.submitButton} >
                      Register
                    </button>
                </div>

                {error && <p className={css.error}>{error}</p>}
            </form>
        </div>
    );
};

export default SignUpPage;