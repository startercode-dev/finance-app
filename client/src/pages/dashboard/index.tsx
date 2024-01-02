import { authenticate } from '@/utils/authenticate';
import { GetServerSideProps } from 'next';
import styles from '@/styles/Dashboard.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    getAccountsData,
    getTransactionsData,
    getUserData,
} from '@/store/userActions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MuseoModerno } from 'next/font/google';
import TransactionItem from '@/components/TransactionItem';
import Link from 'next/link';
// import UserOnboarding from '@/components/UserOnboarding';

const Logo = MuseoModerno({ subsets: ['latin'] });

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/logout');
        await router.push('/');
        router.reload();
    };

    const getTransactions = async () => {
        try {
            await fetch('/api/get-transactions', {
                method: 'GET',
            });

            dispatch(getTransactionsData());

            // console.log('success');
            //! continue implementing user flow
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const init = async () => {
            try {
                dispatch(getUserData());
                dispatch(getAccountsData());
                dispatch(getTransactionsData());
            } catch (error) {
                console.log(error);
            }
        };

        init();
        return () => {};
    }, []);

    return (
        <>
            <main>
                <nav className={`flex ${styles.nav}`}>
                    <div className={`flex ${styles.container}`}>
                        <div className={`${Logo.className} ${styles.logo}`}>
                            MACRO
                        </div>
                        <ul className={`flex ${styles.links}`}>
                            <li>
                                <img src="/accounts.svg" alt="" />
                                <Link href="/accounts">Accounts</Link>
                            </li>
                            <li>
                                <img src="/transactions.svg" alt="" />
                                <Link href="/transactions">Transactions</Link>
                            </li>
                            <li>
                                <img src="/dashboard.svg" alt="" />
                                <Link href="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <img src="/investments.svg" alt="" />
                                <Link href="/investments">Investments</Link>
                            </li>
                            <li>
                                <img src="/settings.svg" alt="" />
                                <Link href="/settings">Settings</Link>
                            </li>
                        </ul>
                        <div>
                            {user.name ? user.name : 'not auth'}
                            <button type="button" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </nav>
                <div className={styles.content}>
                    <div className={styles.column1}>
                        <div className={styles.overview}></div>
                        <div className={styles.accounts}>
                            <ul className={styles.container}>
                                {user.accounts ? (
                                    user.accounts.map((account) => {
                                        return (
                                            <>
                                                <p>{account.accountName}</p>
                                                <p>{account.currentBalance}</p>
                                            </>
                                        );
                                    })
                                ) : (
                                    <p>no data</p>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.column2}>
                        <div className={styles.budget}>
                            <button onClick={getTransactions}>
                                get transactions
                            </button>
                        </div>
                        <div className={styles.transactions}>
                            <h3>Activities</h3>
                            <ul className={styles.container}>
                                {user.transactions ? (
                                    user.transactions.map((transaction) => {
                                        return (
                                            <TransactionItem
                                                key={transaction.transactionId}
                                                transaction={transaction}
                                            />
                                        );
                                    })
                                ) : (
                                    <p>no data</p>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
