import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUserData } from '@/store/userActions';
import { useEffect } from 'react';

export default function Dashboard() {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    // console.log(user);

    useEffect(() => {
        dispatch(getUserData());
        // console.log(user);
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
