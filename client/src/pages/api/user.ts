// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        // console.log(req.cookies.auth);
        if (req.cookies.auth) {
            const token = req.cookies.auth;

            try {
                const response = await fetch(
                    `http://localhost:8000/api/v1/account/user`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (data.status === 'error') {
                    throw 'invalid token';
                }

                res.status(200).json(data);
            } catch (err) {
                // console.log(err);
                res.status(500).json(err);
            }
        }

        try {
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
