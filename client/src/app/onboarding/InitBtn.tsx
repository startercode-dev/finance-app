'use client';

import { useRouter } from 'next/navigation';
import { usePlaidLink } from 'react-plaid-link';
import { getAccessToken } from './actions';
import { useState } from 'react';

export default function InitBtn({ token }) {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const onSuccess = (public_token: string) => {
    const exchangePublicTokenForAccessToken = async () => {
      setSuccess(false);
      const data = await getAccessToken(public_token);

      if (data.status !== 'success') {
        console.log('no access token retrieved');
        return;
      }

      setSuccess(true);
    };

    exchangePublicTokenForAccessToken();
  };

  const { open, ready } = usePlaidLink({
    token: token,
    onSuccess,
  });

  return (
    <>
      {!success ? (
        <button
          onClick={() => open()}
          disabled={!ready}
          className="my-5 rounded-sm border border-black bg-primary px-7 py-2 text-lg text-black drop-shadow-card transition-all hover:bg-white hover:text-primary disabled:border-neutral-300 disabled:bg-neutral-300 disabled:text-neutral-600"
        >
          Connect a bank account
        </button>
      ) : (
        <div className="flex gap-6">
          <button
            disabled
            className="my-5 rounded-sm border border-black bg-primary px-7 py-2 text-lg text-black drop-shadow-card transition-all hover:bg-white hover:text-primary disabled:border-neutral-300 disabled:bg-neutral-300 disabled:text-neutral-600"
          >{`Linked!`}</button>
          <button
            onClick={() => router.push('/dashboard')}
            className="my-5 rounded-sm border border-black bg-primary px-7 py-2 text-lg text-black drop-shadow-card transition-all hover:bg-white hover:text-primary disabled:border-neutral-300 disabled:bg-neutral-300 disabled:text-neutral-600"
          >{`Continue to Dashboard >>`}</button>
        </div>
      )}
    </>
  );
}
