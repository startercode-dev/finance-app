'use server';

import { revalidatePath } from 'next/cache';
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

export async function UpdateMe(name: string, email: string) {
    const token = cookies().get('auth');

    try {
        const res = await fetch('http://localhost:8000/api/v1/user/update-me', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token?.value}`,
            },
            body: JSON.stringify({ name, email }),
        });

        const data = await res.json();

        if (data.status === 'failed' || data.status === 'error') {
            throw data;
        }

        revalidatePath('/');

        return data;
    } catch (error) {
        return error;
    }
}

export async function UpdatePassword(
    passwordCurrent: string,
    password: string,
    passwordConfirm: string,
) {
    const token = cookies().get('auth');

    try {
        const res = await fetch(
            'http://localhost:8000/api/v1/auth/update-password',
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token?.value}`,
                },
                body: JSON.stringify({
                    passwordCurrent,
                    password,
                    passwordConfirm,
                }),
            },
        );

        const data = await res.json();

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

        revalidatePath('/');

        return data;
    } catch (error) {
        return error;
    }
}
