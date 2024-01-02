import { useAppDispatch } from '@/store/hooks';
import { getTransactionsData } from '@/store/userActions';
import styles from '@/styles/Dashboard.module.scss';
import { useState } from 'react';

export default function TransactionItem({ transaction }) {
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);
    const [selectedOption, setSelectedOption] = useState(
        transaction.activeCategory
    );

    const options: string[] = [
        ...transaction.category,
        ...Object.values(transaction.personalCategory),
    ];

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
            const response = await fetch('api/update-transaction', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            });

            await dispatch(getTransactionsData());
            setEditMode(false);
        } else {
            console.log('didnt change');
        }
    };

    return (
        <li className={`flex ${styles.transaction}`}>
            <p>{transaction.authorizedDate}</p>
            <div className={`flex ${styles.info}`}>
                <div className={styles.col2}>
                    <p>{transaction.transactionName}</p>
                    <p className={styles.account}>
                        {transaction.account.accountOfficialName}
                    </p>
                </div>
                <div className={styles.col3}>
                    <p>{transaction.amount}</p>
                    <div className={`flex`}>
                        {!editMode ? (
                            <>
                                <p
                                    className={`${styles.editBtn}`}
                                    onClick={showEdit}
                                >
                                    Edit
                                </p>
                                <p>{transaction.activeCategory}</p>
                            </>
                        ) : (
                            <>
                                <div onClick={hideEdit}>x</div>
                                <div
                                    onClick={() =>
                                        updateActiveCategory(
                                            transaction.transactionId
                                        )
                                    }
                                >
                                    √
                                </div>
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
