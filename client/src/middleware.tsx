import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = process.env.JWT_SECRET;

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get('auth')?.value;

    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        if (token) {
            try {
                const verified = await jwtVerify(
                    token,
                    new TextEncoder().encode(secret)
                );

                console.log(verified.payload);

                return NextResponse.next();
            } catch (err) {
                console.log('***INVALID OR EXPIRED TOKEN***');
                return NextResponse.redirect(new URL('/login', req.url));
            }
        }
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}
