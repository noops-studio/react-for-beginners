import { useEffect, useState } from 'react'
import './Profile.css'
import profileService from '../../../services/profileService'
import PostModel from '../../../models/Post'
import Post from '../post/Post'

function Profile(): JSX.Element {

    const [ posts, setPosts ] = useState<PostModel[]>([])

    useEffect(() => {
        (async() => {
            try {
                const postsFromServer = await profileService.getProfile()
                setPosts(postsFromServer)
            } catch (e) {
                alert(e)
            }
        })()
    }, [])

    return (
        <div className='Profile'>
            {posts.map(post => <Post key={post.id} post={post}/>)}
        </div>
    )
}

// interface PostRowProps {
//     post: Post
// }
// function PostRow(props: PostRowProps): JSX.Element {
//     return (
//         <tr>
//             <td>{props.post.title}</td>
//             <td><img src={props.post.imageUrl} alt=""/></td>
//         </tr>
//     )
// }

export default Profile