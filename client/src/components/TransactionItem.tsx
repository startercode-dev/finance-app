import { useAppDispatch } from '@/store/hooks';
import { getTransactionsData } from '@/store/userActions';
import styles from '@/styles/Dashboard.module.scss';
import { useState } from 'react';
import { CheckCircle, NotePencil, XCircle } from '@phosphor-icons/react';
import { useRouter } from 'next/router';

export default function TransactionItem({ transaction }) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [editMode, setEditMode] = useState(false);
    const [selectedOption, setSelectedOption] = useState(
        transaction.activeCategory
    );

    const options: string[] = [
        ...transaction.category,
        ...Object.values(transaction.personalCategory),
    ];

    const date = new Date(
        transaction.authorizedDate
            ? transaction.authorizedDate
            : transaction.date
    );
    const formattedDate = date.toLocaleDateString('en-US', {
        timeZone: 'UTC',
    });

    const showEdit = () => {
        setEditMode((prevState) => !prevState);
    };

    const hideEdit = () => {
        setEditMode(false);
        setSelectedOption(transaction.activeCategory);
    };

    const handleSelectionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const updateActiveCategory = async (transactionId) => {
        if (transaction.activeCategory !== selectedOption) {
            const body = JSON.stringify({ transactionId, selectedOption });
            const response = await fetch('/api/update-transaction', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            });

            if (!response.ok) {
                router.reload();
            }

            await dispatch(getTransactionsData());
            setEditMode(false);
        } else {
            console.log('didnt change');
        }
    };

    return (
        <li className={`flex ${styles.transaction}`}>
            <p>{formattedDate}</p>
            <div className={`flex ${styles.info}`}>
                <div className={styles.col2}>
                    <p>{transaction.transactionName}</p>
                    <p className={styles.account}>
                        {transaction.account.accountOfficialName}
                    </p>
                </div>
                <div className={styles.col3}>
                    <p>{transaction.amount}</p>
                    <div className={`flex ${styles.category}`}>
                        {!editMode ? (
                            <>
                                <NotePencil
                                    size={20}
                                    weight="light"
                                    className={`${styles.editBtn}`}
                                    onClick={showEdit}
                                />

                                <p>{transaction.activeCategory}</p>
                            </>
                        ) : (
                            <>
                                <XCircle
                                    size={22}
                                    weight="light"
                                    className={styles.cancelBtn}
                                    onClick={hideEdit}
                                />
                                <CheckCircle
                                    size={22}
                                    weight="light"
                                    className={styles.submitBtn}
                                    onClick={() =>
                                        updateActiveCategory(
                                            transaction.transactionId
                                        )
                                    }
                                />

                                <select
                                    value={selectedOption}
                                    onChange={handleSelectionChange}
                                >
                                    {options.map((i) => (
                                        <option key={i} value={i}>
                                            {i}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </li>
    );
}
