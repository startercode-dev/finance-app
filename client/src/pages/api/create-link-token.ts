import type { NextApiRequest, NextApiResponse } from 'next';

export default async function createLinkToken(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'POST') {
        if (req.cookies.auth) {
            const token = req.cookies.auth;

            try {
                const response = await fetch(
                    `http://localhost:8000/api/v1/plaid/item/create_link_token`,
                    {
                        method: req.method,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                const data = await response.json();

                if (data.status === 'error') {
                    throw 'invalid token';
                }

                res.status(200).json(data);
            } catch (err) {
                // console.log(err);
                res.status(401).json(err);
            }
        }
    }
}
