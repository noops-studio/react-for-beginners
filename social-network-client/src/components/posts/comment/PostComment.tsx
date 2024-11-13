import Comment from '../../../models/comment/Comment'
import './PostComment.css'

interface PostCommentProps {
    comment: Comment
}
function PostComment(props: PostCommentProps): JSX.Element {
    return (
        <div className='PostComment'>
            <div>by {props.comment.userId} at {props.comment.createdAt}</div>
            <div>{props.comment.body}</div>
        </div>
    )
}

export default PostComment