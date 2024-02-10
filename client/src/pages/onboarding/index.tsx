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
    <div className="min-h-screen pt-[18vh]">
      <div className="border-dark mx-auto flex w-fit flex-col items-center gap-3 rounded-lg border bg-white p-12 drop-shadow-[6px_6px_0px_#1E0A24]">
        <h1 className={`${Logo.className} text-primary text-6xl `}>MACRO</h1>
        <p className="text-lg">Manage your entire portfolio in one system</p>
        <div className="my-9 h-[1px] w-28 rounded-full bg-neutral-500"></div>
        <h2 className="text-5xl">Welcome!</h2>
        <p className="text-base font-light">
          Let's get started by linking your bank account.
        </p>
        <button
          onClick={() => open()}
          disabled={!ready}
          className="bg-primary border-primary hover:text-primary my-5 rounded-sm border px-7 py-2 text-lg text-white transition-all hover:bg-white disabled:border-neutral-300 disabled:bg-neutral-300 disabled:text-neutral-600"
        >
          Connect a bank account
        </button>
        <p className="font-light">
          * You&#39;re logging in with the bank&#39;s official website via
          Plaid, we do not keep any of your bank&#39;s login credentials !
        </p>
      </div>
    </div>
  );
}
