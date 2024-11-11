import axios from "axios";
import Post from "../../models/post/Post";
import AuthAwareService from "./AuthAwareService";
import PostDraft from "../../models/post/PostDraft";

class ProfileService extends AuthAwareService {
    async getProfile(): Promise<Post[]> {
        const response = await this.axiosInstance.get<Post[]>(`${process.env.REACT_APP_REST_SERVER}/posts`)
        const posts = response.data
        return posts
    }

    async getPost(id: string): Promise<Post> {
        const response = await this.axiosInstance.get<Post>(`${process.env.REACT_APP_REST_SERVER}/posts/${id}`)
        const post = response.data
        return post
    }

    async remove(id: string): Promise<void> {
        await this.axiosInstance.delete(`${process.env.REACT_APP_REST_SERVER}/posts/${id}`)
    }

    async create(draft: PostDraft): Promise<Post> {
        const response = await this.axiosInstance.post<Post>(`${process.env.REACT_APP_REST_SERVER}/posts`, draft)
        const newPost = response.data;
        return newPost
    }

    async update(id: string, draft: PostDraft): Promise<Post> {
        const response = await this.axiosInstance.patch<Post>(`${process.env.REACT_APP_REST_SERVER}/posts/${id}`, draft)
        const newPost = response.data;
        return newPost
    }

}

export default ProfileService