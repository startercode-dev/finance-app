import { NextResponse, NextRequest } from 'next/server';
import { authenticate } from './utils/authenticate';

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get('auth')?.value;

    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        if (token) {
            try {
                await authenticate(token);

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
