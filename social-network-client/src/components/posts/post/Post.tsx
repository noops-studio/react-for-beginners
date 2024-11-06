import './Post.css'
import PostModel from '../../../models/Post'
import profileService from '../../../services/profileService'

interface PostProps {
    post: PostModel
}
function Post(props: PostProps): JSX.Element {

    async function deleteMe() {
        try {
            if(window.confirm('are you sure yu want to delete this post?')) {
                await profileService.remove(props.post.id)
            }
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='Post'>
            <div>by {props.post.userId} on {props.post.createdAt.toString()}</div>
            <div>{props.post.title}</div>
            <div>{props.post.body}</div>
            <div><button onClick={deleteMe}>delete</button></div>
        </div>
    )
}

export default Post