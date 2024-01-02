import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function logout(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('auth', 'expired', {
            httpOnly: true,
            maxAge: -1,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            path: '/',
        })
    );
    res.status(200).json({
        message: 'loggedout',
    });
}
