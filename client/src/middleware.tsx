import { NextResponse, NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

const secret = 'jjjjjkkkkk';

export default function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        const cookie = req.cookies.get('auth');
        const jwt = cookies.auth;
        const url = req.url;

        if (url.includes('/dashboard')) {
            if (jwt === undefined) {
                return NextResponse.redirect('/login');
            }

            try {
                verify(jwt, secret);

                return NextResponse.next();
            } catch (err) {
                return NextResponse.redirect('/login');
            }
        }

        return NextResponse.next();
    }
}
