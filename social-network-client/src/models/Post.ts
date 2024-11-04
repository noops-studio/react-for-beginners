export default interface Post{
    id: string,
    userId: string,
    title: string,
    body: string,
    imageUrl: string,
    createdAt: Date,
    updatedAt: Date
}