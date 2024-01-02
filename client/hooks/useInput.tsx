import { useState } from 'react';

export default function useInput(validateValue: (value: string) => boolean, initState = {}) {
    const [values, setValues] = useState(initState);
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validateValue(values);

    const hasError = !isValid && isTouched;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((prevStrate) => { ...values, [e.target.name]: e.target.value });
    };

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsTouched(true);
    };

    return {
        value: enteredValue,
        isValid,
        hasError,
        onChange,
        onBlur,
    };
}
