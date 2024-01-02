'use server';

import { cookies } from 'next/headers';

export async function getAccessToken(public_token: string) {
    const token = cookies().get('auth')?.value;

    const response = await fetch(
        `http://localhost:8000/api/v1/plaid/item/get_access_token`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ public_token }),
        },
    );

    const data = await response.json();

    if (data.status !== 'success') {
        console.log(data);
    }

    return data.status;
}
