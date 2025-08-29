'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import css from './page.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { updateUser, ApiError } from '@/lib/api/clientApi';

const ProfileEditPage = () => {
    const { user, setUser } = useAuthStore();
    const router = useRouter();
    const [username, setUsername] = useState(user?.username || '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const updatedUser = await updateUser({ username });
            setUser(updatedUser);
            router.push('/profile');
        } catch (err) {
            setError(
                (err as ApiError).response?.data?.error ??
                (err as ApiError).message ??
                'Failed to update profile'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        router.push('/profile');
    };

    if (!user) {
        return <div className={css.mainContent}>Loading...</div>;
    }

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image
                    src={user.avatar || "/default-avatar.png"}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />

                <form className={css.profileInfo} onSubmit={handleSubmit}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={css.input}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <p>Email: {user.email}</p>

                    {error && <p className={css.error}>{error}</p>}

                    <div className={css.actions}>
                        <button
                            type="submit"
                            className={css.saveButton}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            type="button"
                            className={css.cancelButton}
                            onClick={handleCancel}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default ProfileEditPage;