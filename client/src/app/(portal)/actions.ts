'use server';

import { cookies } from 'next/headers';

export async function handleLogout() {
    try {
        const res = await fetch('http://localhost:8000/api/v1/auth/logout', {
            method: 'POST',
        });

        const data = await res.json();
        // console.log(data);

        if (data.status === 'failed' || data.status === 'error') {
            throw data;
        }

        // Set a cookie to hide the banner
        cookies().delete('auth');

        return;
    } catch (error) {
        // console.log(error);
        return error;
    }
}
