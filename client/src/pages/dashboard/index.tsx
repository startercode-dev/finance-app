import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUserData } from '@/store/userActions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/logout');
        router.push('/');
    };

    useEffect(() => {
        if (user.isAuth === false) {
            dispatch(getUserData());
        }
    }, []);

    return (
        <>
            <h1>dashboard</h1>
            <h2>{user.isAuth ? 'auth' : 'not auth'}</h2>
            <button type="button" onClick={handleLogout}>
                Logout
            </button>
        </>
    );
}
