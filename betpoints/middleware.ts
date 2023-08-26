// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // apply trailing slash handling
  if (
    !pathname.endsWith('/') &&
    !pathname.match(/((?!\.well-known(?:\/.*)?)(?:[^/]+\/)*[^/]+\.\w+)/)
  ) {
    const redirectUrl = new URL(req.nextUrl.pathname + '/', req.nextUrl);
    redirectUrl.search = req.nextUrl.search;
    return NextResponse.redirect(redirectUrl, 308);
  }
}

export const config = {
  matcher: ['/((?!api/|sbr-web/_next/static|favicon.ico|fonts|robots.txt).*)'],
};
