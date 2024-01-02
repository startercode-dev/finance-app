import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest) {
    const { transactionId, selectedOption } = await req.json();
    const token = req.cookies.get('auth')?.value;
    // console.log(transactionId, selectedOption, token);

    try {
        const response = await fetch(
            `http://localhost:8000/api/v1/transaction/${transactionId}`,
            {
                method: req.method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    activeCategory: selectedOption,
                }),
            },
        );

        const data = await response.json();
        console.log(data);

        if (data.status === 'error') {
            throw data;
        }

        return Response.json({
            data,
        });
    } catch (error) {
        console.log(error);
        return Response.json({
            status: 'error',
        });
    }
}
