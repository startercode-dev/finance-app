import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from './page.module.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

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
