'use client';

import { useRouter } from 'next/navigation';
import { usePlaidLink } from 'react-plaid-link';
import { getAccessToken } from './actions';

export default function InitBtn({ token }) {
  const router = useRouter();

  const onSuccess = (public_token: string) => {
    const exchangePublicTokenForAccessToken = async () => {
      const data = await getAccessToken(public_token);

      if (data !== 'success') {
        console.log('no access token retrieved');
        return;
      }

      router.push('/dashboard');
    };

    exchangePublicTokenForAccessToken();
  };

  const { open, ready } = usePlaidLink({
    token: token,
    onSuccess,
  });

  return (
    <>
      <button
        onClick={() => open()}
        disabled={!ready}
        className="my-5 rounded-sm border border-black bg-primary px-7 py-2 text-lg text-black drop-shadow-card transition-all hover:bg-white hover:text-primary disabled:border-neutral-300 disabled:bg-neutral-300 disabled:text-neutral-600"
      >
        Connect a bank account
      </button>
    </>
  );
}
