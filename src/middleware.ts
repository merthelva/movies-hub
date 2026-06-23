import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const protectedPaths = ["/lists"];

const authMiddleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken");

  const [, locale] = pathname.split("/");

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.toLowerCase().startsWith(`/${locale}${path}`.toLowerCase()),
  );

  if (isProtectedPath && !accessToken) {
    const redirectUrl = new URL(`/${locale}/auth/login`, request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return null;
};

export default function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request);

  const authResponse = authMiddleware(request);
  if (authResponse) {
    return authResponse;
  }

  return intlResponse;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
