import Request from "../request";

class UtilsService {
  static async getCity(query) {
    let url = query ? `?q=${query}` : "";
    const options = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    return await fetch(`/utils/city${url}`, options);
  }
  static async getProvince(query) {
    let url = query ? `?q=${query}` : "";
    const options = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    return await fetch(`/utils/province${url}`, options);
  }
  static async upload(payload) {
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: payload,
    };
    return await Request.post(`/clients/upload`, options);
  }
  static async removeUpload(payload) {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    };
    return await Request.put(`/clients/remove-upload`, options);
  }
}

export default UtilsService;
