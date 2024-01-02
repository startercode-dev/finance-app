import useInput from '@/hooks/useInput';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
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
        if (data.status === 'failed') {
          throw data.msg;
        }

        const itemResponse = await fetch('/api/fetch-items');
        const items = await itemResponse.json();
        if (items.results > 0) {
          router.push('/dashboard');
        } else {
          router.push('/onboarding');
        }
      } catch (err) {
        // console.log(err);
        setServerErrorMessage(`${err}`);
      }
    }
  };

  return (
    <form onSubmit={handlerLogin} className="form">
      <div className="flex w-80 flex-col gap-3">
        <input
          className="form-input"
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={emailOnChange}
          onBlur={emailOnBlur}
        />
        {emailHasError && <p>! need to be valid email</p>}

        <input
          className="form-input"
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
          className="text-primary border-primary hover:bg-primary rounded border px-4 py-2 hover:text-white"
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="text-primary border-primary hover:bg-primary rounded border px-4 py-2 hover:text-white"
        >
          Back
        </button>
      </div>
    </form>
  );
}
