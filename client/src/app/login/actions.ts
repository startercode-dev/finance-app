'use server';

import { cookies } from 'next/headers';

export async function handleLogin(email: string, password: string) {
    try {
        const res = await fetch('http://localhost:8000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await res.json();
        // console.log(data);

        if (data.status === 'failed' || data.status === 'error') {
            throw data;
        }

        // Set a cookie to hide the banner
        cookies().set({
            name: 'auth',
            value: data.token,
            httpOnly: true,
            maxAge: 60 * 60 * 24, // in seconds
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            path: '/',
        });

        return { status: data.status };
    } catch (error) {
        console.log(error);
        return error;
    }
}
