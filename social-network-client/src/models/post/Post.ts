import PostDraft from "./PostDraft";

export default interface Post extends PostDraft{
    id: string,
    userId: string,
    imageUrl: string,
    createdAt: Date,
    updatedAt: Date
}