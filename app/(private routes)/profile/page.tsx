import { Metadata } from 'next';
import { getServerMe } from '@/lib/api/serverApi';
import css from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
    title: "Profile - NoteHub",
    description: "Manage your NoteHub profile. View and edit your account information, settings, and preferences.",
    openGraph: {
        title: "Profile - NoteHub",
        description: "Manage your NoteHub profile. View and edit your account information, settings, and preferences.",
        url: "https://08-zustand-henna.vercel.app/profile",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "NoteHub - Profile Page",
            },
        ],
    },
    robots: {
        index: false,
        follow: false,
    },
};

const ProfilePage = async () => {
    const user = await getServerMe();

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <div className={css.header}>
                    <h1 className={css.formTitle}>Profile Page</h1>
                    <Link href="/profile/edit" className={css.editProfileButton}>
                        Edit Profile
                    </Link>
                </div>
                <div className={css.avatarWrapper}>
                    <Image
                        src={user?.avatar || "/default-avatar.png"}
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />
                </div>
                <div className={css.profileInfo}>
                    <p>
                        Username: {user?.username || 'N/A'}
                    </p>
                    <p>
                        Email: {user?.email || 'N/A'}
                    </p>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;