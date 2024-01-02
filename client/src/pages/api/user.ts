// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { jwtVerify } from 'jose';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        // console.log(req.headers.cookie);
        if (req.headers.cookie) {
            const token = req.headers.cookie.split('=')[1];
            const verified = await jwtVerify(
                token,
                new TextEncoder().encode(process.env.JWT_SECRET)
            );
            const id = verified.payload.id;

            try {
                const response = await fetch(
                    `http://localhost:8000/api/v1/account/${id}`
                );

                const data = await response.json();
                // console.log(data);

                res.status(200).json(data);
            } catch (err) {
                console.log(err);
            }
        }

        try {
        } catch (err) {
            res.status(500).json(err);
        }
    }
}