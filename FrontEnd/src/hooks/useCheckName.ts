import { useEffect, useState } from 'react';

export function useCheckName() {
  const [name, setName] = useState<string>('');
  const [isCorrectName, setIsCorrectName] = useState<boolean>(false);

  useEffect(() => {
    const nameFormat = /^[a-zA-Z]{1,20}$/;
    if (nameFormat.test(name)) {
      setIsCorrectName(true);
    } else {
      setIsCorrectName(false);
    }
  }, [name]);

  return { name, setName, isCorrectName };
}
