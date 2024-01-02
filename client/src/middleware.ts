import { NextResponse, NextRequest } from 'next/server';
import { authenticate } from './utils/authenticate';

export default async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        const token = req.cookies.get('auth')?.value;

        if (token) {
            try {
                await authenticate(token);
                return NextResponse.next();
            } catch (err) {
                console.log('***INVALID OR EXPIRED TOKEN***', err);
                return NextResponse.redirect(new URL('/login', req.url));
            }
        }

        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (req.nextUrl.pathname.startsWith('/login')) {
        const token = req.cookies.get('auth')?.value;

        if (token) {
            try {
                await authenticate(token);
                return NextResponse.redirect(new URL('/dashboard', req.url));
            } catch (err) {
                return NextResponse.next();
            }
        }

        return NextResponse.next();
    }

    if (req.nextUrl.pathname.startsWith('/signup')) {
        const token = req.cookies.get('auth')?.value;

        if (token) {
            try {
                await authenticate(token);
                return NextResponse.redirect(new URL('/dashboard', req.url));
            } catch (err) {
                return NextResponse.next();
            }
        }

        return NextResponse.next();
    }

    if (req.nextUrl.pathname.startsWith('/onboarding')) {
        const token = req.cookies.get('auth')?.value;

        if (token) {
            try {
                await authenticate(token);
                const response = await fetch(
                    `http://localhost:8000/api/v1/item/get`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const { items } = await response.json();
                if (items.length > 0) {
                    return NextResponse.redirect(
                        new URL('/dashboard', req.url)
                    );
                }

                return NextResponse.next();
            } catch (err) {
                console.log(err);
                return NextResponse.next();
            }
        }

        return NextResponse.next();
    }
}
