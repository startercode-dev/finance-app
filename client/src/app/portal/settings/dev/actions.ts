'use server';

import { cookies } from 'next/headers';

export async function FireWebhook() {
    const token = cookies().get('auth');

    try {
        const res = await fetch(
            `http://localhost:8000/api/v1/plaid/fire_webhook`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token?.value}`,
                },
            },
        );

        const data = await res.json();

        if (data.status === 'error') {
            throw 'invalid token';
        }

        return data;
    } catch (error) {
        return error;
    }
}

export async function UpdateWebhook(url: string) {
    const token = cookies().get('auth');

    try {
        const res = await fetch(
            `http://localhost:8000/api/v1/plaid/update_webhook`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token?.value}`,
                },
                body: JSON.stringify({ newUrl: url }),
            },
        );

        const data = await res.json();
        console.log(data);

        if (data.status === 'error') {
            throw 'invalid token';
        }

        return data;
    } catch (error) {
        return error;
    }
}
