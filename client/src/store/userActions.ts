import { AppDispatch } from '.';
import { userActions } from './userSlice';

export const getUserData = () => {
    return async (dispatch: AppDispatch) => {
        const fetchData = async () => {
            const response = await fetch('/api/user');
            if (!response.ok) {
                throw new Error('failed to fetch data');
            }

            const data = await response.json();

            return data;
        };

        try {
            const { data } = await fetchData();
            // console.log(data);
            dispatch(userActions.setUser(data));
        } catch (err) {
            console.log(err);
        }
    };
};
