import { useEffect, useState } from 'react';

export function useCheckCfPassword(password: string) {
  const [cfPassword, setCfPassword] = useState<string>('');
  const [isCorrectCfPassword, setIsCorrectCfPassword] = useState<boolean>(false);

  useEffect(() => {
    if (cfPassword === password) {
      setIsCorrectCfPassword(true);
    } else {
      setIsCorrectCfPassword(false);
    }
  }, [cfPassword, password]);

  return { cfPassword, setCfPassword, isCorrectCfPassword };
}
