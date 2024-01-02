import { AppDispatch } from '.';
import { userActions } from './userSlice';

export const getUserData = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await fetch('/api/user');
            const { data } = await response.json();

            if (!response.ok) {
                throw new Error('failed to fetch data');
            }

            dispatch(userActions.setUser(data));
        } catch (err) {
            console.log(err);
        }
    };
};
