import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUserData } from '@/store/userActions';
import { useEffect } from 'react';

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        if (user.isAuth === false) {
            dispatch(getUserData());
        }
    }, []);

    return (
        <>
            <h1>dashboard</h1>
            <h2>{user.isAuth ? 'auth' : 'not auth'}</h2>
        </>
    );
}

//! Look into using getServersideprops for this as well, so the first render won't be 'not auth'
