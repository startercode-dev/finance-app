'use client';

import useInput from '@/hooks/useInput';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UpdateMe } from '../actions';

export default function UserForm({ userData }) {
  const router = useRouter();
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const [serverErrorMessage, setServerErrorMessage] = useState('');

  const {
    value: name,
    isValid: nameIsValid,
    onChange: nameOnChange,
  } = useInput((value) => value.trim() !== '', userData.name);

  const {
    value: email,
    isValid: emailIsValid,
    onChange: emailOnChange,
  } = useInput(
    (value) => value.trim() !== '' && emailRegex.test(value),
    userData.email,
  );

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
    if (!nameIsValid) {
      setServerErrorMessage('please enter a valid name');
      return;
    }

    if (!emailIsValid) {
      setServerErrorMessage('please enter a valid email');
      return;
    }

    try {
      const res = await UpdateMe(name, email);
      if (res.status !== 'success') {
        throw res;
      }
      setServerErrorMessage('updated!');
    } catch (error) {
      if (error.errorObj.code === 11000) {
        setServerErrorMessage(`! user already exists`);
      } else {
        setServerErrorMessage(error.msg);
      }
    }
  };

  return (
    <div className="mb-12 flex flex-col gap-4">
      <form className="w-2/5" onSubmit={handleUpdate}>
        <div className="mb-6 flex flex-col">
          <label className="">Name</label>
          <input
            className="rounded border border-black bg-white px-4 py-2 drop-shadow-card placeholder:text-black placeholder:opacity-50 focus:outline-none"
            type="text"
            name="name"
            placeholder={userData.name}
            value={name}
            onChange={nameOnChange}
          />
        </div>

        <div className="mb-10 flex flex-col">
          <label className="">Email</label>
          <input
            className="rounded border border-black bg-white px-4 py-2 drop-shadow-card placeholder:text-black placeholder:opacity-50 focus:outline-none"
            type="email"
            name="email"
            placeholder={userData.email}
            value={email}
            onChange={emailOnChange}
          />
        </div>

        {serverErrorMessage && <p className="my-4">{serverErrorMessage}</p>}
        <button
          disabled={name === userData.name && email === userData.email}
          type="submit"
          className="rounded border border-black bg-primary px-4 py-2 drop-shadow-card focus:outline-none disabled:opacity-50"
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
