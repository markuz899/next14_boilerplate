import UtilsService from './service';

class Utils {
  static async getCity(query) {
    try {
      const res = await UtilsService.getCity(query);
      if (!res.ok) throw res;
      return await res.json();
    } catch (err) {
      console.error(`*err - get getCity* ${err}`);
      if (err.status === 401) {
        console.log('logout');
      }
      return { error: true };
    }
  }
  static async getProvince(query) {
    try {
      const res = await UtilsService.getProvince(query);
      if (!res.ok) throw res;
      return await res.json();
    } catch (err) {
      console.error(`*err - get getProvince* ${err}`);
      if (err.status === 401) {
        console.log('logout');
      }
      return { error: true };
    }
  }
  static async upload(payload) {
    try {
      const res = await UtilsService.upload(payload);
      if (!res.ok) throw res;
      return await res.json();
    } catch (err) {
      console.error(`*err - get upload* ${err}`);
      if (err.status === 401) {
        console.log('logout');
      }
      return { error: true };
    }
  }
  static async removeUpload(payload) {
    try {
      const res = await UtilsService.removeUpload(payload);
      if (!res.ok) throw res;
      return await res.json();
    } catch (err) {
      console.error(`*err - get upload* ${err}`);
      if (err.status === 401) {
        console.log('logout');
      }
      return { error: true };
    }
  }
}

export default Utils;
