import { createSlice } from '@reduxjs/toolkit';

interface User {
    name: string;
    newUser: boolean;
    transactions: Transaction[];
    plaidLinkToken: string;
}

interface Transaction {
    transactionId: string;
    date: string;
    amount: number;
    authorizedDate: string;
    transactionName: string;
    account: {
        accountOfficialName: string;
    };
    category: [];
    personalCategory: {
        detailed: string;
        primary: string;
    };
    activeCategory: string;
}

const initialState: User = {
    name: '',
    newUser: true,
    transactions: [],
    plaidLinkToken: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload;
        },

        setPlaidLinkToken: (state, action) => {
            state.plaidLinkToken = action.payload;
        },

        setTransactions: (state, action) => {
            state.transactions = action.payload;
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
