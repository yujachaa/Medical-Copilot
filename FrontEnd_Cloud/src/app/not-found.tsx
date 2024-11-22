// app/not-found.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store/hooks/store';

export default function NotFound() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    setIsLoggedIn(!!accessToken); // 로그인 여부 상태 업데이트
  }, [accessToken]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <h1 className="text-2xl font-bold text-gray-800">Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-600">
        The page you requested might have been removed, or the path may be incorrect.
      </p>

      {isLoggedIn ? (
        <button
          onClick={() => router.back()}
          className="mt-6 px-6 py-2 text-[#6ea7e9] border border-[#6ea7e9] rounded hover:bg-[#6ea7e9] hover:text-white"
        >
          Go back to the previous page
        </button>
      ) : (
        <button
          onClick={() => router.replace('/')}
          className="mt-6 px-6 py-2 text-[#6ea7e9] border border-[#6ea7e9] rounded hover:bg-[#6ea7e9] hover:text-white"
        >
          Go back to Home
        </button>
      )}
    </div>
  );
}
