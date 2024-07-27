// middleware.ts (o .js se non usi TypeScript)
import { NextRequest, NextResponse } from "next/server";

export const config = {
  // matcher solution for public, api, assets and _next exclusion
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  if (request.nextUrl.pathname.startsWith("/about")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
