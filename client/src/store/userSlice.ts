import { createSlice } from '@reduxjs/toolkit';

interface User {
    name: string;
    accounts: Account[];
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

interface Account {
    accountId: string;
    accountName: string;
    accountOfficialName: string;
    availableBalance: number;
    currentBalance: number;
    subtype: string;
}

const initialState: User = {
    name: '',
    accounts: [],
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

        setAccounts: (state, action) => {
            state.accounts = action.payload;
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
