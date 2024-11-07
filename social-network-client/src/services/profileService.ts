import axios from "axios";
import Post from "../models/post/Post";
import PostDraft from "../models/post/PostDraft";

class ProfileService {
    async getProfile(): Promise<Post[]> {
        const response = await axios.get<Post[]>(`${process.env.REACT_APP_REST_SERVER}/posts`)
        const posts = response.data
        return posts
    }

    async getPost(id: string): Promise<Post> {
        const response = await axios.get<Post>(`${process.env.REACT_APP_REST_SERVER}/posts/${id}`)
        const post = response.data
        return post
    }

    async remove(id: string): Promise<void> {
        await axios.delete(`${process.env.REACT_APP_REST_SERVER}/posts/${id}`)
    }

    async create(draft: PostDraft): Promise<Post> {
        const response = await axios.post<Post>(`${process.env.REACT_APP_REST_SERVER}/posts`, draft)
        const newPost = response.data;
        return newPost
    }
}

const profileService = new ProfileService()
export default profileService