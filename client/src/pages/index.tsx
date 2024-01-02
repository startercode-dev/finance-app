import styles from '../styles/Home.module.scss';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { authenticate } from '@/utils/authenticate';

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.auth}>
                <Link href="/login" className={styles.authLink}>
                    Login
                </Link>
                <Link href="/signup" className={styles.authLink}>
                    Sign Up
                </Link>
            </div>
        </main>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    try {
        const token = req.cookies.auth;
        if (token) {
            const authed = await authenticate(token);

            if (authed === true) {
                return {
                    redirect: {
                        destination: '/dashboard',
                        permanent: false,
                    },
                };
            }
        }
    } catch (error) {
        console.log('***INVALID OR EXPIRED TOKEN***');
    }

    return {
        props: {},
    };
};
