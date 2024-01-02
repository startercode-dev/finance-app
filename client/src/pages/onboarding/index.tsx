import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { userActions } from '@/store/userSlice';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { MuseoModerno } from 'next/font/google';

const Logo = MuseoModerno({ subsets: ['latin'] });

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
    <div className="flex flex-col items-center pt-[18vh] min-h-screen gap-3">
      <h1 className={`${Logo.className} text-6xl text-primary `}>MACRO</h1>
      <p className="text-lg">Manage your entire portfolio in one system</p>
      <div className="w-28 h-[1px] bg-neutral-500 my-9 rounded-full"></div>
      <h2 className="text-5xl">Welcome!</h2>
      <p className="text-base font-light">
        Let's get started by linking your bank account.
      </p>
      <button
        onClick={() => open()}
        disabled={!ready}
        className="my-5 text-lg bg-primary text-white px-7 py-2 border border-primary hover:bg-white hover:text-primary disabled:bg-neutral-300 disabled:border-neutral-300 disabled:text-neutral-600 transition-all rounded-sm"
      >
        Connect a bank account
      </button>
      <p className="font-light">
        * You&#39;re logging in with the bank&#39;s official website via Plaid,
        we do not keep any of your bank&#39;s login credentials !
      </p>
    </div>
  );
}
