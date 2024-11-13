import Post from "../post/Post"

export default interface Comment {
    id: string,
    postId: string,
    userId: string,
    body: string,
    createdAt: string
    post: Post
}