import './Post.css'
import PostModel from '../../../models/post/Post'
import profileService from '../../../services/profileService'
import { Link } from 'react-router-dom'

interface PostProps {
    post: PostModel,
    removePost(id: string): Promise<void>
}
function Post(props: PostProps): JSX.Element {

    async function deleteMe() {
        if(window.confirm('are you sure you want to delete this post?')) {
            await props.removePost(props.post.id)
        }
    }

    return (
        <div className='Post'>
            <div>by {props.post.userId} on {props.post.createdAt.toString()}</div>
            <div>{props.post.title}</div>
            <div>{props.post.body}</div>
            <div>
                <button onClick={deleteMe}>delete</button>
                <Link to={`/profile/edit/${props.post.id}`}>edit</Link>
            </div>
        </div>
    )
}

export default Post