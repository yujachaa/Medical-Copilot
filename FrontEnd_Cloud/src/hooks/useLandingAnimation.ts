import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function useLandingAnimation() {
  const router = useRouter();

  const medicalRef = useRef<HTMLSpanElement>(null);
  const copilotRef = useRef<HTMLSpanElement>(null);
  const [animation, setAnimation] = useState<boolean>(false);

  useEffect(() => {
    const medical = medicalRef.current;
    const copilot = medicalRef.current;
    if (medical && copilot) {
      setTimeout(() => {
        setAnimation(true);
      }, 500);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  }, [router]);

  return { animation, medicalRef, copilotRef };
}
