import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { userActions } from '@/store/userSlice';
import { authenticate } from '@/utils/authenticate';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';

export default function UserOnboarding() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const router = useRouter();

    const getAccounts = async () => {
        try {
            await fetch('/api/get-accounts', {
                method: 'GET',
            });
            console.log('success');
        } catch (error) {
            console.log(error);
        }
    };

    const generateToken = useCallback(async () => {
        const response = await fetch('/api/create-link-token', {
            method: 'POST',
        });

        const data = await response.json();
        // console.log(data);
        dispatch(userActions.setPlaidLinkToken(data.link_token));
    }, []);

    const onSuccess = (public_token: string) => {
        const exchangePublicTokenForAccessToken = async () => {
            const response = await fetch('/api/get-access-token', {
                method: 'POST',
                body: JSON.stringify({ public_token }),
            });

            if (!response.ok) {
                console.log('no access token retrieved');
                return;
            }

            await getAccounts();
            router.push('/dashboard');
        };

        exchangePublicTokenForAccessToken();
    };

    const { open, ready } = usePlaidLink({
        token: user.plaidLinkToken,
        onSuccess,
    });

    useEffect(() => {
        const init = async () => {
            try {
                generateToken();
            } catch (error) {
                console.log(error);
            }
        };

        init();
        return () => {};
    }, []);

    return (
        <>
            <button onClick={() => open()} disabled={!ready}>
                Connect a bank account
            </button>
        </>
    );
}
