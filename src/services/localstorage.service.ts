class LocalStorageService {
  static getItem(key: string): string {
    const result = localStorage.getItem(key);
    if (result) return result;
    return "";
  }
}

export default LocalStorageService;
