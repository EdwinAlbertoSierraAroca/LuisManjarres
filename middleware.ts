import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const res = NextResponse.next();
  // Defensa extra: las APIs admin nunca deben cachearse ni indexarse.
  if (pathname.startsWith('/api/admin')) {
    res.headers.set('Cache-Control', 'no-store');
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const hasSession = request.cookies.has('ps_admin');
    if (!hasSession) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
  }
  return res;
}
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
