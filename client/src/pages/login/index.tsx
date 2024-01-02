import LoginForm from '@/components/LoginForm';
import { authenticate } from '@/utils/authenticate';
import { GetServerSideProps } from 'next';

export default function Signup() {
    return <LoginForm />;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    try {
        const token = req.cookies.auth;
        if (token) {
            const authed = await authenticate(token);

            if (authed === true) {
                return {
                    redirect: {
                        destination: '/dashboard',
                        permanent: false,
                    },
                };
            } else {
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    },
                };
            }
        }
    } catch (error) {
        console.log('***INVALID OR EXPIRED TOKEN***');
    }

    return {
        props: {},
    };
};
