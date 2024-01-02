import { createSlice } from '@reduxjs/toolkit';

interface User {
    isAuth: boolean;
    plaidLinkToken: string;
}

const initialState: User = {
    isAuth: false,
    plaidLinkToken: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },

        setPlaidLinkToken: (state, action) => {
            state.plaidLinkToken = action.payload;
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
