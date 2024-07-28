// middleware.ts (o .js se non usi TypeScript)
import { NextRequest, NextResponse } from "next/server";

function pathToRegex(path: string) {
  const escapedPath = path.replace(/\//g, "\\/").replace(/:\w+/g, "([^\\/]+)");
  return new RegExp(`^${escapedPath}(\\/)?$`);
}

export const config = {
  // matcher solution for public, api, assets and _next exclusion
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};

export function middleware(request: NextRequest, response: NextResponse) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const tenantInfo: any = request.headers.get("tenantInfo");
  const tenant = tenantInfo ? JSON.parse(tenantInfo) : {};

  const isValidRoute = tenant?.route?.find((route: any) => {
    // Check static route
    if (route.path === pathname) {
      return true;
    }

    // Check dynamic route
    const dynamicPathRegex = pathToRegex(route.path);
    if (
      dynamicPathRegex.test(pathname) &&
      pathname.split("/").length === route.path.split("/").length
    ) {
      return route;
    }
  });

  if (!isValidRoute) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  const res = NextResponse.next();
  // get target route and send to page
  res.headers.set("route", JSON.stringify(isValidRoute));
  // if (request.nextUrl.pathname.startsWith("/about")) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  return res;
}
