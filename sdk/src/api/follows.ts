import BaseAPI from "./base";

class FollowsAPI extends BaseAPI {
  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}, timeout: number = 5000) {
    super(baseURL, defaultHeaders, timeout); // Call BaseAPI constructor
  }

  async getUserFollowers() {
    const response = await this.client.get("/follows/followers");
    return response.data;
  }

  async getUserFollowing() {
    const response = await this.client.get("/follows/following");
    return response.data;
  }

  async follow(userId: string) {
    const response = await this.client.post(`/follows/follow/${userId}`);
    return response.data;
  }

  async unfollow(userId: string) {
    const response = await this.client.post(`/follows/unfollow/${userId}`);
    return response.data;
  }
}

export default FollowsAPI;
