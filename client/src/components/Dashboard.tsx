import styles from '@/styles/Dashboard.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getTransactionsData, getUserData } from '@/store/userActions';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { MuseoModerno } from 'next/font/google';
import { userActions } from '@/store/userSlice';
import { usePlaidLink } from 'react-plaid-link';

const Logo = MuseoModerno({ subsets: ['latin'] });

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/logout');
        router.push('/');
    };

    const generateToken = useCallback(async () => {
        const response = await fetch('/api/create-link-token', {
            method: 'POST',
        });

        const data = await response.json();
        // console.log(data);
        dispatch(userActions.setPlaidLinkToken(data.link_token));
    }, []);

    const onSuccess = useCallback((public_token: string) => {
        const exchangePublicTokenForAccessToken = async () => {
            const response = await fetch('/api/get-access-token', {
                method: 'POST',
                body: JSON.stringify({ public_token }),
            });

            const data = await response.json();
            // console.log(data);
        };

        exchangePublicTokenForAccessToken();
    }, []);

    const { open, ready } = usePlaidLink({
        token: user.plaidLinkToken,
        onSuccess,
    });

    const getTransactions = async () => {
        try {
            await fetch('/api/get-transactions', {
                method: 'GET',
            });
            console.log('success');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const init = async () => {
            if (user.name === '') {
                try {
                    await dispatch(getUserData());
                    dispatch(getTransactionsData());
                    generateToken();
                } catch (error) {
                    console.log(error);
                }
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
                                <a href="#">Accounts</a>
                            </li>
                            <li>
                                <img src="/transactions.svg" alt="" />
                                <a href="#">Transactions</a>
                            </li>
                            <li>
                                <img src="/dashboard.svg" alt="" />
                                <a href="#">Dashboard</a>
                            </li>
                            <li>
                                <img src="/investments.svg" alt="" />
                                <a href="#">Investments</a>
                            </li>
                            <li>
                                <img src="/settings.svg" alt="" />
                                <a href="#">Settings</a>
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
                        <div className={styles.accounts}></div>
                    </div>
                    <div className={styles.column2}>
                        <div className={styles.budget}>
                            <button onClick={() => open()} disabled={!ready}>
                                Connect a bank account
                            </button>
                            <button onClick={getTransactions}>
                                get transactions
                            </button>
                        </div>
                        <div className={styles.transactions}>
                            <h3>Activities</h3>
                            <div className={styles.container}>
                                {user.transactions ? (
                                    user.transactions.map((transaction) => (
                                        <div
                                            className={`flex ${styles.transaction}`}
                                        >
                                            <p>{transaction.authorizedDate}</p>
                                            <div
                                                className={`flex ${styles.info}`}
                                            >
                                                <div className={styles.col2}>
                                                    <p>
                                                        {
                                                            transaction.transactionName
                                                        }
                                                    </p>
                                                    <p
                                                        className={
                                                            styles.account
                                                        }
                                                    >
                                                        {transaction.accountId}
                                                    </p>
                                                </div>
                                                <div className={styles.col3}>
                                                    <p>{transaction.amount}</p>
                                                    <p>
                                                        {
                                                            transaction
                                                                .personalCategory
                                                                .primary
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>no data</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
