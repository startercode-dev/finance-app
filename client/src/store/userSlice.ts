import { createSlice } from '@reduxjs/toolkit';

interface User {
    isAuth: boolean;
}

const initialState: User = {
    isAuth: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
