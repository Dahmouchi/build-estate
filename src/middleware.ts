/* eslint-disable @typescript-eslint/no-explicit-any */
/* middleware.ts */
import { NextResponse } from "next/server";

const locales = ["en", "fr", "ar"];

function getLocale(request: Request) {
  const acceptLang = request.headers.get("accept-language") || "";
  const detected = locales.find((locale) =>
    acceptLang.toLowerCase().startsWith(locale.toLowerCase())
  );
  return detected || "en";
}

export function middleware(request: any) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: [
    '/((?!api/auth|_next|.*\\..*).*)',
  ],
};
