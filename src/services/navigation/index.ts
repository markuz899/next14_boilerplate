class Navigation {
  static async getPosition(payload: any) {
    try {
      const res = await NavigationService.getPosition(payload);
      if (!res.ok) throw res;
      return await res.json();
    } catch (err: any) {
      console.error("*err - get navigation*", err);
      if (err.status === 401) {
        console.log("logout");
      }
      return { error: true };
    }
  }
}
