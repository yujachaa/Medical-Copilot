import { useEffect, useState } from 'react';

export function useCheckEmail() {
  const [email, setEmail] = useState<string>('');
  const [isCorrectEmail, setIsCorrectEmail] = useState<boolean>(false);

  useEffect(() => {
    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailFormat.test(email)) {
      setIsCorrectEmail(true);
    } else {
      setIsCorrectEmail(false);
    }
  }, [email]);

  return { email, setEmail, isCorrectEmail };
}
