import Comment from "../../models/comment/Comment";
import AuthAwareService from "./AuthAwareService";

class CommentsService extends AuthAwareService {
    async getAll(): Promise<Comment[]> {
        const response = await this.axiosInstance.get<Comment[]>(`${process.env.REACT_APP_REST_SERVER}/comments`)
        const comments = response.data
        return comments
    }
}

export default CommentsService;