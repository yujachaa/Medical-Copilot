import { useEffect, useState } from 'react';

export function useCheckPassword() {
  const [password, setPassword] = useState<string>('');
  const [isCorrectPassword, setIsCorrectPassword] = useState<boolean>(false);

  useEffect(() => {
    const passWordFormat =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;?,.<>'"-])[^\s]{8,15}$/;
    if (passWordFormat.test(password)) {
      setIsCorrectPassword(true);
    } else {
      setIsCorrectPassword(false);
    }
  }, [password]);

  return { password, setPassword, isCorrectPassword };
}
