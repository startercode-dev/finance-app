import { useState } from 'react';

export const useForm = (callback: () => Promise<any>, initState = {}) => {
    const [values, setValues] = useState(initState);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await callback();
    };

    return {
        values,
        onChange,
        onSubmit,
    };
};
