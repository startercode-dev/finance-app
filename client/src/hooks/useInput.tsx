import { useState } from 'react';

export default function useInput(validateValue: (value: string) => boolean) {
  const [value, setValues] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateValue(value);

  const hasError = !isValid && isTouched;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(e.target.value);
  };

  const onBlur = () => {
    setIsTouched(true);
  };

  return {
    value,
    isValid,
    hasError,
    onChange,
    onBlur,
  };
}
