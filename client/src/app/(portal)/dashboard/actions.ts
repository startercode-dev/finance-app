'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function initFetch() {
    const token = cookies().get('auth')?.value;

    // Get today's date, and 24m ago date
    const today = new Date();
    const startDate = new Date(new Date().setFullYear(today.getFullYear() - 2))
        .toISOString()
        .split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];

    const accounts = await fetch(
        `http://localhost:8000/api/v1/plaid/accounts/get`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        },
    );

    const accountsData = await accounts.json();

    if (accountsData.status !== 'success') {
        console.log(accountsData);
    }

    const transactions = await fetch(
        `http://localhost:8000/api/v1/plaid/transactions/get`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ startDate, endDate }),
        },
    );

    const transactionsData = await transactions.json();

    if (transactionsData.status !== 'success') {
        console.log(transactionsData);
    }

    revalidatePath('/');
}

export async function updateActiveCategory(
    transactionId: string,
    selectedOption: string,
) {
    const token = cookies().get('auth')?.value;

    const res = await fetch(
        `http://localhost:8000/api/v1/transaction/${transactionId}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                activeCategory: selectedOption,
            }),
        },
    );

    const data = await res.json();

    if (data.status !== 'success') {
        console.log(data);
    }

    revalidatePath('/');
}
