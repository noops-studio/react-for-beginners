import BaseAPI from "./base";

class CommentsAPI extends BaseAPI {
  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}, timeout: number = 5000) {
    super(baseURL, defaultHeaders, timeout); // Call BaseAPI constructor
  }

  async getAll() {
    const response = await this.client.get("/comments");
    return response.data;
  }

  async getPerPost(postId: string) {
    const response = await this.client.get(`/comments/${postId}`);
    return response.data;
  }

  async create(postId: string, body: string) {
    const response = await this.client.post(`/comments/${postId}`, { body });
    return response.data;
  }

  async update(id: string, body: string) {
    const response = await this.client.patch(`/comments/${id}`, { body });
    return response.data;
  }

  async remove(id: string) {
    const response = await this.client.delete(`/comments/${id}`);
    return response.data;
  }
}

export default CommentsAPI;
