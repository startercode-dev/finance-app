import styles from '@/styles/Dashboard.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUserData } from '@/store/userActions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function MainDashboard() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/logout');
        router.push('/');
    };

    useEffect(() => {
        if (user.isAuth === false) {
            dispatch(getUserData());
        }
    }, []);

    return (
        <>
            <main>
                <nav className={`flex ${styles.nav}`}>
                    <div className={`flex ${styles.container}`}>
                        <div>macro</div>
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
                            {user.isAuth ? (
                                <button type="button" onClick={handleLogout}>
                                    Logout
                                </button>
                            ) : (
                                'not auth'
                            )}
                        </div>
                    </div>
                </nav>
                <div className={styles.content}>
                    <div className={styles.column1}>
                        <div className={styles.overview}></div>
                        <div className={styles.accounts}></div>
                    </div>
                    <div className={styles.column2}>
                        <div className={styles.budget}></div>
                        <div className={styles.transactions}>
                            <h3>Activities</h3>
                            <div className={styles.container}>
                                <div className={`flex ${styles.transaction}`}>
                                    <p>01/07/23</p>
                                    <div className={`flex ${styles.info}`}>
                                        <div className={styles.col2}>
                                            <p>NORTHSTAR@TAHOE LIFT TCKT</p>
                                            <p className={styles.account}>
                                                Chase 1.5% Unlimited
                                            </p>
                                        </div>
                                        <div className={styles.col3}>
                                            <p>$170.00</p>
                                            <p>..category</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={`flex ${styles.transaction}`}>
                                    <p>01/07/23</p>
                                    <div className={`flex ${styles.info}`}>
                                        <div className={styles.col2}>
                                            <p>Chick-fil-a</p>
                                            <p className={styles.account}>
                                                USBank Altitude Go
                                            </p>
                                        </div>
                                        <div className={styles.col3}>
                                            <p>$10.00</p>
                                            <p>Food</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={`flex ${styles.transaction}`}>
                                    <p>01/07/23</p>
                                    <div className={`flex ${styles.info}`}>
                                        <div className={styles.col2}>
                                            <p>Aerotek Payroll</p>
                                            <p className={styles.account}>
                                                Chase Checking
                                            </p>
                                        </div>
                                        <div className={styles.col3}>
                                            <p>+$8208.90</p>
                                            <p>Income</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={`flex ${styles.transaction}`}>
                                    <p>01/07/23</p>
                                    <div className={`flex ${styles.info}`}>
                                        <div className={styles.col2}>
                                            <p>Chick-fil-a</p>
                                            <p className={styles.account}>
                                                USBank Altitude Go
                                            </p>
                                        </div>
                                        <div className={styles.col3}>
                                            <p>$10.00</p>
                                            <p>Food</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={`flex ${styles.transaction}`}>
                                    <p>01/07/23</p>
                                    <div className={`flex ${styles.info}`}>
                                        <div className={styles.col2}>
                                            <p>Chick-fil-a</p>
                                            <p className={styles.account}>
                                                USBank Altitude Go
                                            </p>
                                        </div>
                                        <div className={styles.col3}>
                                            <p>$10.00</p>
                                            <p>Food</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
