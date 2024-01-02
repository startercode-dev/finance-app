import { AppDispatch } from '.';
import { userActions } from './userSlice';

export const getUserData = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await fetch('/api/user');

            if (!response.ok) {
                throw 'failed to fetch data';
            }

            const { data } = await response.json();
            // console.log(data);
            dispatch(userActions.setUser(data.name));

            // dispatch(userActions.setUser(data.name));
        } catch (err) {
            throw err;
        }
    };
};

export const getAccountsData = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await fetch('/api/fetch-accounts');
            if (!response.ok) {
                throw 'failed to fetch accounts';
            }
            const data = await response.json();
            // console.log(data);
            dispatch(userActions.setAccounts(data.accounts));
        } catch (error) {
            throw error;
        }
    };
};

export const getTransactionsData = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await fetch('/api/fetch-transactions');

            if (!response.ok) {
                throw 'failed to fetch data';
            }

            const data = await response.json();
            const transactions = data.transactions;
            if (transactions.length !== 0) {
                dispatch(userActions.setTransactions(transactions));
            }
        } catch (err) {
            throw err;
        }
    };
};
