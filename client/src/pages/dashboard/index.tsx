import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUserData } from '@/store/userActions';
import { useEffect } from 'react';

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        if (user.id === '') {
            dispatch(getUserData());
        }
    }, []);

    return (
        <>
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <h2>{user.id}</h2>
        </>
    );

    //! nodejs nextjs jwt on youtube
}
