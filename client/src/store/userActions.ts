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
            console.log(err);
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

            dispatch(userActions.setTransactions(transactions));
        } catch (err) {
            console.log(err);
        }
    };
};
