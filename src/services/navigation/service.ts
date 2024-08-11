class NavigationService {
  static async getPosition(payload: any) {
    const { latitude, longitude } = payload;
    const options = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    return await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      options
    );
  }
}

export default NavigationService;
