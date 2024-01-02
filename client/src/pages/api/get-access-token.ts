import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getAccessToken(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        if (req.cookies.auth) {
            const token = req.cookies.auth;

            try {
                const response = await fetch(
                    `http://localhost:8000/api/v1/plaid/item/get_access_token`,
                    {
                        method: req.method,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: req.body,
                    }
                );

                const data = await response.json();

                if (data.status === 'error') {
                    throw 'invalid token';
                }
                // console.log(data);

                res.status(200).json(data);
            } catch (err) {
                // console.log(err);
                res.status(500).json(err);
            }
        }
    } else {
        res.status(400).json({
            error: 'invalid request',
        });
    }
}
