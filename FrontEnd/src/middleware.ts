import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 미들웨어에서 쿠키로 전달된 accessToken을 확인하여 Authorization 헤더에 추가
export function middleware(req: NextRequest) {
  // 쿠키에서 accessToken 가져오기
  const accessToken = req.cookies.get('accessToken');
  console.log('미들웨어에서 쿠키에서 엑세스 토큰!!:', accessToken);

  if (accessToken) {
    const headers = new Headers(req.headers);
    headers.set('Authorization', `Bearer ${accessToken}`);
    headers.set('Content-Type', 'application/json');

    // 요청에 Authorization 헤더를 추가하고 반환
    return NextResponse.next({
      request: {
        headers,
      },
    });
  } else {
    // 로그인 페이지로 리다이렉트하면서 쿼리 파라미터 추가
    const loginUrl = new URL('/login?message=login_required', req.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/onpremise/api:path*'], // 미들웨어가 실행될 경로 설정
};
