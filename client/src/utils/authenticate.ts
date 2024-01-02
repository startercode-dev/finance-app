import { jwtVerify } from 'jose';

export async function authenticate(token: string): Promise<boolean> {
    const valid = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET),
    );
    if (valid) {
        return true;
    } else {
        return false;
    }
}
