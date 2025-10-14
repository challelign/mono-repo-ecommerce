// import createMiddleware from 'next-intl/middleware';
// import {routing} from '@/i18n/routing';
 
// // export default createMiddleware(routing);

// export default createMiddleware({
//   ...routing,
//   // Automatically redirect to defaultLocale if none is in the path
//   localeDetection: true,
// });
 
// export const config = {
//   matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
//     // matcher: ["/", "/(en|fr|de)/:path*"],

// }

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { routing } from '@/i18n/routing';

// export function middleware(req: NextRequest) {
//   const url = req.nextUrl.clone();

//   if (url.pathname === '/') {
//     url.pathname = `/${routing.defaultLocale}`;
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
// };


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from '@/i18n/routing';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only redirect root `/`
  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}`;
    return NextResponse.redirect(url);
  }

  // Optionally: force supported locales
  const supportedLocales = routing.locales;
  const firstSegment = pathname.split('/')[1];

  if (!supportedLocales.includes(firstSegment)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'], // matches all pages except API and static
};
