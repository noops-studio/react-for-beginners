import Comment from '../../../models/comment/Comment'
import './PostCommentSlow.css'

interface PostCommentSlowProps {
    comment: Comment
}
function PostCommentSlow(props: PostCommentSlowProps): JSX.Element {

    const startTime = performance.now()
    while(performance.now() - startTime < 20) {}

    return (
        <div className='PostCommentSlow'>
            <div>by {props.comment.userId} at {props.comment.createdAt}</div>
            <div>{props.comment.body}</div>
        </div>
    )
}

export default PostCommentSlow