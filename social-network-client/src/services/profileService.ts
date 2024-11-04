import axios from "axios";
import Post from "../models/Post";

class ProfileService {
    async getProfile(): Promise<Post[]> {
        const response = await axios.get<Post[]>(`${process.env.REACT_APP_REST_SERVER}/posts`)
        const posts = response.data
        return posts
    }
}

const profileService = new ProfileService()
export default profileService