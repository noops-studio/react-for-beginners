import BaseAPI from "./base";

class PostsAPI extends BaseAPI {
  async getPerUser() {
    const response = await this.client.get("/posts");
    return response.data;
  }

  async getOne(id: string) {
    const response = await this.client.get(`/posts/${id}`);
    return response.data;
  }

  async create(title: string, body: string) {
    const response = await this.client.post("/posts", { title, body });
    return response.data;
  }

  async update(id: string, title: string, body: string) {
    const response = await this.client.patch(`/posts/${id}`, { title, body });
    return response.data;
  }

  async remove(id: string) {
    const response = await this.client.delete(`/posts/${id}`);
    return response.data;
  }
}

export default PostsAPI;
