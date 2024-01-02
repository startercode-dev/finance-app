import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const response = await fetch(
            'http://localhost:8000/api/v1/auth/logout',
            {
                method: req.method,
            },
        );

        const data = await response.json();
        if (data.status === 'failed' || data.status === 'error') {
            throw data;
        }

        const res = NextResponse.json({ status: 200, data });
        res.cookies.set({
            name: 'auth',
            value: 'loggedout',
            httpOnly: true,
            maxAge: -1, // in seconds
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            path: '/',
        });

        return res;
    } catch (error) {
        return Response.json({
            status: error.statusCode,
            error,
        });
    }
}
