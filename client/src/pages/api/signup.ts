// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function signup(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const body = req.body;

        try {
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
            // console.log(data.error);

            if (data.status === 'error') {
                throw data.error;
            }

            res.setHeader(
                'Set-Cookie',
                cookie.serialize('auth', data.token, {
                    httpOnly: true,
                    maxAge: process.env.JWT_COOKIE_EXP * 60 * 60, // in seconds
                    secure:
                        process.env.NODE_ENV !== 'development' ||
                        req.headers['x-forwarded-proto'] === 'https',

                    sameSite: 'strict',
                    path: '/',
                })
            );

            res.status(201).json({
                message: 'success',
            });
        } catch (err) {
            // console.log(err);
            res.status(500).json(err);
        }
    }
}
