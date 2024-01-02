import { authenticate } from '@/utils/authenticate';
import { GetServerSideProps } from 'next';
import SignupForm from '../../components/SignupForm';

export default function Signup() {
    return <SignupForm />;
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
