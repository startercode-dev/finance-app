import { createSlice } from '@reduxjs/toolkit';

interface User {
    id: string;
    name: string;
    email: string;
}

const initialState: User = {
    id: '',
    name: '',
    email: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
