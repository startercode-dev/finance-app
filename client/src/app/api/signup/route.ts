import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const response = await fetch(
            'http://localhost:8000/api/v1/auth/signup',
            {
                method: req.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            },
        );

        const data = await response.json();
        // console.log(data);

        if (data.status === 'failed' || data.status === 'error') {
            throw data;
        }

        const res = NextResponse.json({ status: 200, data });
        res.cookies.set({
            name: 'auth',
            value: data.token,
            httpOnly: true,
            maxAge: 60 * 60 * process.env.JWT_COOKIE_EXP, // in seconds
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
