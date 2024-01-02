'use client';

import styles from './SignupForm.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

type Form = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

export default function SignupForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { touchedFields },
    } = useForm<Form>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
    });

    const nameValidator = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
    };

    const handleSignup: SubmitHandler<Form> = async (formValues) => {
        // send values to database
        // console.log(formValues);
        // await fetch('http://localhost:8000/api/v1/auth/signup', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(values),
        // });
    };

    console.log(touchedFields);

    const inputClasses = touchedFields.name
        ? `${styles.inputs} ${styles.invalid}`
        : `${styles.inputs}`;

    //note break input into component so that each can have touched css

    return (
        <form onSubmit={handleSubmit(handleSignup)} className={styles.form}>
            <div className={inputClasses}>
                <input
                    type="name"
                    placeholder="Name"
                    {...register('name')}
                    // required
                />
                <input
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                    // required
                />

                <input
                    type="password"
                    placeholder="Password"
                    {...register('password')}
                    // required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register('passwordConfirm')}
                    // required
                />
                <button type="submit">Sign Up</button>
                <button type="button" onClick={() => router.back()}>
                    Back
                </button>
            </div>
        </form>
    );
}
