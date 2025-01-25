import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class BaseAPI {
  protected client: AxiosInstance;

  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}, timeout: number = 5000) {
    this.client = axios.create({
      baseURL,
      headers: { ...defaultHeaders },
      timeout,
    });

    // Attach an error interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const message = error.response?.data?.message || error.message;
        const code = error.response?.status || 500;
        throw { code, message };
      }
    );
  }

  // Set authentication token
  setToken(token: string) {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // Clear authentication token
  clearToken() {
    delete this.client.defaults.headers.common["Authorization"];
  }

  // Update client configuration dynamically
  updateConfig(config: AxiosRequestConfig) {
    Object.assign(this.client.defaults, config);
  }
}

export default BaseAPI;
