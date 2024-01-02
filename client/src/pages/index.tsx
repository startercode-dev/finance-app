import styles from '../styles/Home.module.css';
import Link from 'next/link';

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
