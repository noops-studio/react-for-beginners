import './Post.css'
import PostModel from '../../../models/Post'

interface PostProps {
    post: PostModel
}
function Post(props: PostProps): JSX.Element {
    return (
        <div className='Post'>
            <div>by {props.post.userId} on {props.post.createdAt.toString()}</div>
            <div>{props.post.title}</div>
            <div>{props.post.body}</div>
        </div>
    )
}

export default Post