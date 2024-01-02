import useInput from '@/hooks/useInput';
import styles from './Form.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '@/store/userSlice';

export default function LoginForm() {
    const router = useRouter();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const [serverErrorMessage, setServerErrorMessage] = useState('');
    const dispatch = useDispatch();

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

                const { data } = await res.json();
                const user = data.user;
                // console.log(user);
                dispatch(userActions.setUser(user));

                if (data.status === 'failed') {
                    setServerErrorMessage(data.msg);
                    return;
                }

                router.push('/dashboard');
            } catch (err) {
                setServerErrorMessage('error');
            }
        }
    };

    return (
        <form onSubmit={handlerLogin} className={styles.form}>
            <div className={styles.inputs}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={emailOnChange}
                    onBlur={emailOnBlur}
                />
                {emailHasError && <p>need to be valid email</p>}

                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={passwordOnChange}
                    onBlur={passwordOnBlur}
                />
                {passwordHasError && <p>must be 2 or more</p>}

                {serverErrorMessage && <p>{serverErrorMessage}</p>}
                <button type="submit">Login</button>
                <button type="button" onClick={() => router.back()}>
                    Back
                </button>
            </div>
        </form>
    );
}
