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
}

export { CookieManager };
