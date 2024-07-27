// middleware.ts (o .js se non usi TypeScript)
import { NextRequest, NextResponse } from "next/server";
import { routes } from "./utils/constants";

function pathToRegex(path: string) {
  const escapedPath = path.replace(/\//g, "\\/").replace(/:\w+/g, "([^\\/]+)");
  return new RegExp(`^${escapedPath}(\\/)?$`);
}

export const config = {
  // matcher solution for public, api, assets and _next exclusion
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  const isValidRoute = routes.some((route: any) => {
    // Check static route
    if (route.path === pathname) {
      return true;
    }

    // Check dinamic route
    const dynamicPathRegex = pathToRegex(route.path);
    return (
      dynamicPathRegex.test(pathname) &&
      pathname.split("/").length === route.path.split("/").length
    );
  });
  console.log(isValidRoute);
  if (!isValidRoute) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }
  // if (request.nextUrl.pathname.startsWith("/about")) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  return NextResponse.next();
}
