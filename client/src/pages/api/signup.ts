// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const t: number = process.env.JWT_EXPIRES_IN;

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

        if (!response.ok) {
            res.status(500).json({ error: data.msg });
        } else {
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('auth', data.token, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24, // in seconds
                    secure:
                        process.env.NODE_ENV !== 'development' ||
                        req.headers['x-forwarded-proto'] === 'https',

                    sameSite: 'strict',
                    path: '/',
                })
            );

            res.status(201).json({
                // data,
                message: 'success',
            });
        }
    }
}
