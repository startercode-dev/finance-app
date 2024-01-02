import { useState } from 'react';

export default function useInput(
  validateValue: (value: string) => boolean,
  initValue: string = '',
) {
  const [value, setValues] = useState(initValue);
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
