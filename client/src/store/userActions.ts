import { AppDispatch } from '.';
import { userActions } from './userSlice';

export const getUserData = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await fetch('/api/user');
            const data = await response.json();
            // console.log(data);

            if (!response.ok) {
                throw 'failed to fetch data';
            }

            // const { data } = await response.json();
            // console.log(data);
            // dispatch(userActions.setUser(data));

            dispatch(userActions.setAuth(true));
        } catch (err) {
            console.log(err);
        }
    };
};
