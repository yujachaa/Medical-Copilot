import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/main']; // 로그인 유저만 접근할 수 있는 페이지
const publicRoutes = ['/login', '/']; // 로그인 유저는 접근할 수 없는 페이지

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const accessToken = request.cookies.get('accessToken');

  // 보호된 경로 접근: 로그인하지 않은 사용자는 /login으로 리다이렉트
  if (!accessToken && protectedRoutes.some((route) => currentPath.match(route))) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('alert', 'loginRequired');
    return NextResponse.redirect(url);
  }

  // 로그인한 사용자가 publicRoutes에 접근한 경우 메인 페이지로 리다이렉트
  if (accessToken && publicRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = '/main'; // 로그인 후 이동할 기본 경로
    return NextResponse.redirect(url);
  }

  // 요청을 그대로 진행
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/main/:path*'], // :path*는 하위 경로를 포함
};
