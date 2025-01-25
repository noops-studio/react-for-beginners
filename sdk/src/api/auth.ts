import BaseAPI from "./base";

class AuthAPI extends BaseAPI {
  async login(username: string, password: string) {
    const response = await this.client.post("/auth/login", { username, password });
    if (response.data.success && response.data.data?.jwt) {
      this.setToken(response.data.data.jwt); // Automatically attach token
    }
    return response.data;
  }

  async signup(name: string, username: string, password: string) {
    const response = await this.client.post("/auth/signup", { name, username, password });
    return response.data;
  }
}

export default AuthAPI;
