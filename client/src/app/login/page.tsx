'use client';

import useInput from '@/hooks/useInput';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  const {
    value: email,
    hasError: emailHasError,
    isValid: emailIsValid,
    onChange: emailOnChange,
    onBlur: emailOnBlur,
  } = useInput((value) => value.trim() !== '' && emailRegex.test(value));

  const {
    value: password,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    onChange: passwordOnChange,
    onBlur: passwordOnBlur,
  } = useInput((value) => value.length > 2);

  const handlerLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setServerErrorMessage('');
    if (emailIsValid && passwordIsValid) {
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await res.json();
        // console.log(data);

        if (data.error) {
          throw data.error;
        }

        // const itemResponse = await fetch('/api/fetch-items');
        // const items = await itemResponse.json();
        // if (items.results > 0) {
        //   router.push('/dashboard');
        // } else {
        //   router.push('/onboarding');
        // }

        router.push('/portal/dashboard');
      } catch (error) {
        // console.log(error);
        setServerErrorMessage(`${error.msg}`);
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handlerLogin} className="form">
        <div className="flex w-80 flex-col gap-3">
          <input
            className="rounded border border-primary bg-inherit px-4 py-2 focus:outline-none"
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={emailOnChange}
            onBlur={emailOnBlur}
          />
          {emailHasError && <p>! need to be valid email</p>}

          <input
            className="rounded border border-primary bg-inherit px-4 py-2 focus:outline-none"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={passwordOnChange}
            onBlur={passwordOnBlur}
          />
          {passwordHasError && <p>! must be 2 or more</p>}

          {serverErrorMessage && <p>{serverErrorMessage}</p>}
          <button
            type="submit"
            className="rounded border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-white"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="rounded border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-white"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
