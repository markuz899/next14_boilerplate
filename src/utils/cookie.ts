import { IncomingMessage } from "http";

class CookieManager {
  static get(cookieName: string): string | null {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }

  static set(
    cookieName: string,
    cookieValue: string,
    expirationDays: number = 1
  ): void {
    const expirationDate = new Date();
    expirationDate.setTime(
      expirationDate.getTime() + expirationDays * 24 * 60 * 60 * 1000
    );
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie =
      cookieName +
      "=" +
      encodeURIComponent(cookieValue) +
      ";" +
      expires +
      ";path=/";
  }

  static delete(cookieName: string): void {
    document.cookie =
      cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  static getSsrCookie(req: IncomingMessage, name: string): string | undefined {
    if (!req?.headers?.cookie) {
      return undefined;
    }

    const cookies = req.headers.cookie?.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=").map((part) => part.trim());
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {} as Record<string, string>);

    return cookies[name];
  }

  static removeSsrCookie = (
    req: IncomingMessage,
    res: any,
    name: string
  ): void => {
    if (!req?.headers?.cookie) {
      return;
    }

    const cookies = req.headers.cookie?.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=").map((part) => part.trim());
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {} as Record<string, string>);

    if (cookies[name]) {
      res.setHeader("Set-Cookie", `${name}=; Max-Age=0; path=/; httponly`);
    }
  };
}

export { CookieManager };
