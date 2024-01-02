'use client';

import useInput from '@/hooks/useInput';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UserForm() {
  const router = useRouter();
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const [serverErrorMessage, setServerErrorMessage] = useState('');

  const {
    value: name,
    hasError: nameHasError,
    isValid: nameIsValid,
    onChange: nameOnChange,
    onBlur: nameOnBlur,
  } = useInput((value) => value.trim() !== '');

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

  const {
    value: passwordConfirm,
    hasError: passwordConfirmHasError,
    isValid: passwordConfirmIsValid,
    onChange: passwordConfirmOnChange,
    onBlur: passwordConfirmOnBlur,
  } = useInput((value) => value === password);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setServerErrorMessage('');
    if (
      nameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      passwordConfirmIsValid
    ) {
      try {
      } catch (error) {
        // console.log(error);
      }
    }
  };

  return (
    <div className="mb-12 flex flex-col gap-4">
      <form className="w-2/5" onClick={handleUpdate}>
        <div className="mb-6 flex flex-col">
          <label className="">Name</label>
          <input
            className="rounded border border-black bg-white px-4 py-2 drop-shadow-card focus:outline-none"
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={nameOnChange}
            onBlur={nameOnBlur}
          />
          {nameHasError && <p>! can't be empty</p>}
        </div>

        <div className="mb-10 flex flex-col">
          <label className="">Email</label>
          <input
            className="rounded border border-black bg-white px-4 py-2 drop-shadow-card focus:outline-none"
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={emailOnChange}
            onBlur={emailOnBlur}
          />
          {emailHasError && <p>! need to be valid email</p>}
        </div>

        <button
          type="submit"
          className="rounded border border-black bg-primary px-4 py-2 drop-shadow-card focus:outline-none"
        >
          Update profile
        </button>
      </form>

      <div className="mt-20 h-[1px] w-full bg-black"></div>

      <form className="w-full">
        <h3 className="mb-6 font-title text-2xl">Update your password</h3>

        <div className="mb-10 flex gap-14">
          <div className="flex w-1/2 flex-col">
            <label>New password</label>
            <input
              className="rounded border border-black bg-white px-4 py-2 drop-shadow-card focus:outline-none"
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={passwordOnChange}
              onBlur={passwordOnBlur}
            />
            {passwordHasError && <p>! must be 2 or more</p>}
          </div>

          <div className="flex w-1/2 flex-col">
            <label>Confirm password</label>
            <input
              className="rounded border border-black bg-white px-4 py-2 drop-shadow-card focus:outline-none"
              type="password"
              name="passwordConfirm"
              placeholder="passwordConfirm"
              value={passwordConfirm}
              onChange={passwordConfirmOnChange}
              onBlur={passwordConfirmOnBlur}
            />
            {passwordConfirmHasError && <p>! password don't match</p>}
          </div>
        </div>

        {serverErrorMessage && <p>{serverErrorMessage}</p>}
        <button
          type="submit"
          className="rounded border border-black bg-primary px-4 py-2 drop-shadow-card focus:outline-none"
        >
          Update Password
        </button>
        {/* <button
            type="button"
            onClick={() => router.push('/')}
            className="rounded border border-primary-dark px-4 py-2 text-primary-dark hover:bg-primary-dark hover:text-white"
          >
            Back
          </button> */}
      </form>
    </div>
  );
}
