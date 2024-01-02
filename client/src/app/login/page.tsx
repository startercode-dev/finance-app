'use client';

import useInput from '@/hooks/useInput';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { handleLogin } from './actions';

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
        const res = await handleLogin(email, password);

        if (res.status !== 'success') {
          throw res;
        }

        router.push('/dashboard');
      } catch (error) {
        // console.log(error);
        setServerErrorMessage(`${error.msg}`);
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handlerLogin} className="form">
        <div className="flex w-80 flex-col gap-5">
          <input
            className="rounded border border-primary-dark bg-inherit bg-white px-4 py-2 placeholder:text-neutral-500 focus:outline-none"
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={emailOnChange}
            onBlur={emailOnBlur}
          />
          {emailHasError && <p>! need to be valid email</p>}

          <input
            className="rounded border border-primary-dark bg-inherit bg-white px-4 py-2 placeholder:text-neutral-500 focus:outline-none"
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
            className="rounded border border-primary-dark bg-white px-4 py-2 text-primary-dark hover:bg-primary-dark hover:text-white "
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="rounded border border-primary-dark bg-white px-4 py-2 text-primary-dark hover:bg-primary-dark hover:text-white "
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
