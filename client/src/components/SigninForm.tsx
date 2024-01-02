import useInput from '@/hooks/useInput';
import styles from './Form.module.css';
import { useRouter } from 'next/navigation';

export default function SigninForm() {
    const router = useRouter();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

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

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (emailIsValid && passwordIsValid) {
            const res = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            console.log(await res.json());

            router.push('/dashboard');
        }
    };

    return (
        <form onSubmit={handleSignup} className={styles.form}>
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

                <button type="submit">Login</button>
                <button type="button" onClick={() => router.back()}>
                    Back
                </button>
            </div>
        </form>
    );
}
