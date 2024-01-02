// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const body = req.body;

        const response = await fetch(
            'http://localhost:8000/api/v1/auth/signup',
            {
                method: req.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            }
        );

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            res.status(500).json({ error: data.msg });
        } else {
            res.status(201).json({
                message: 'signed up',
            });
        }
    }
}
