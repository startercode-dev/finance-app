import type { NextApiRequest, NextApiResponse } from 'next';

export default async function updateTransaction(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'PATCH') {
        if (req.cookies.auth) {
            const token = req.cookies.auth;
            const { transactionId, selectedOption } = req.body;

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
                    }
                );

                const data = await response.json();

                if (data.status === 'error') {
                    throw data;
                }

                res.status(200).json(data);
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        }
    } else {
        res.status(400).json({
            error: 'invalid request',
        });
    }
}
