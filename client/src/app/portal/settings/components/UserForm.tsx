'use client';

import useInput from '@/hooks/useInput';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UpdateMe, UpdatePassword } from '../actions';

export default function UserForm({ userData }) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const [profileMsgs, setProfileMsgs] = useState('');
  const [passwordMsgs, setPasswordMsgs] = useState('');

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
    value: passwordCurrent,
    hasError: passwordCurrentHasError,
    isValid: passwordCurrentIsValid,
    onChange: passwordCurrentOnChange,
  } = useInput((value) => value.length > 2);

  const {
    value: password,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    onChange: passwordOnChange,
  } = useInput((value) => value.length > 2);

  const {
    value: passwordConfirm,
    hasError: passwordConfirmHasError,
    isValid: passwordConfirmIsValid,
    onChange: passwordConfirmOnChange,
    onBlur: passwordConfirmOnBlur,
  } = useInput((value) => value === password);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setProfileMsgs('');
    if (!nameIsValid) {
      setProfileMsgs('please enter a valid name');
      return;
    }

    if (!emailIsValid) {
      setProfileMsgs('please enter a valid email');
      return;
    }

    try {
      const res = await UpdateMe(name, email);
      if (res.status !== 'success') {
        throw res;
      }
      setProfileMsgs('updated!');
      setTimeout(() => {
        setProfileMsgs('');
      }, 2000);
    } catch (error) {
      if (error.errorObj.code === 11000) {
        setProfileMsgs(`! user already exists`);
      } else {
        setProfileMsgs(error.msg);
      }
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPasswordMsgs('');

    if (passwordCurrentIsValid && passwordIsValid && passwordConfirmIsValid) {
      try {
        const res = await UpdatePassword(
          passwordCurrent,
          password,
          passwordConfirm,
        );

        if (res.status !== 'success') {
          throw res;
        }

        setPasswordMsgs('updated!');

        setTimeout(() => {
          setPasswordMsgs('');
        }, 2000);
      } catch (error) {
        setPasswordMsgs(error.msg);
      }
    }
  };

  return (
    <div className="mb-12 flex flex-col gap-4">
      <form className="w-2/5" onSubmit={handleUpdateProfile}>
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

        {profileMsgs && <p className="mb-4">{profileMsgs}</p>}
        <button
          disabled={name === userData.name && email === userData.email}
          type="submit"
          className="rounded border border-black bg-primary px-4 py-2 drop-shadow-card focus:outline-none disabled:opacity-50"
        >
          Update profile
        </button>
      </form>

      <div className="mt-20 h-[1px] w-full bg-black"></div>

      <form className="w-full" onSubmit={handleUpdatePassword}>
        <h3 className="mb-6 font-title text-2xl">Update your password</h3>

        <div className="mb-10 grid grid-cols-2 gap-x-14 gap-y-7">
          <div className="flex w-full flex-col">
            <label>Current Password</label>
            <input
              className="rounded border border-black bg-white px-4 py-2 drop-shadow-card focus:outline-none"
              type="password"
              name="passwordCurrent"
              placeholder="current password"
              value={passwordCurrent}
              onChange={passwordCurrentOnChange}
            />
          </div>

          <div className="col-start-1 flex w-full flex-col">
            <label>New password</label>
            <input
              className="rounded border border-black bg-white px-4 py-2 drop-shadow-card focus:outline-none"
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={passwordOnChange}
            />
          </div>

          <div className="flex w-full flex-col">
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
          </div>
        </div>

        {passwordConfirmHasError && (
          <p className="pb-4">{`! password don't match`}</p>
        )}

        {passwordMsgs && <p className="mb-4">{passwordMsgs}</p>}

        <button
          type="submit"
          className="rounded border border-black bg-primary px-4 py-2 drop-shadow-card focus:outline-none"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
