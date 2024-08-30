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
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&polygon_geojson=1&lat=${latitude}&lon=${longitude}`,
      options
    );
  }

  static async getPositionCity(payload: any) {
    const { city } = payload;
    const options = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    return await fetch(
      `https://nominatim.openstreetmap.org/search.php?q=${city}&format=jsonv2&polygon_geojson=1`,
      options
    );
  }
}

export default NavigationService;
