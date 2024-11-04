import { useEffect, useState } from 'react'
import './Profile.css'
import profileService from '../../../services/profileService'
import Post from '../../../models/Post'

function Profile(): JSX.Element {

    const [ posts, setPosts ] = useState<Post[]>([])

    useEffect(() => {
        (async() => {
            const postsFromServer = await profileService.getProfile()
            setPosts(postsFromServer)
        })()
    }, [])

    return (
        <div className='Profile'>
            <table>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>image</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => <PostRow key={post.id} post={post}/>)}
                </tbody>
            </table>
        </div>
    )
}

interface PostRowProps {
    post: Post
}
function PostRow(props: PostRowProps): JSX.Element {
    return (
        <tr>
            <td>{props.post.title}</td>
            <td><img src={props.post.imageUrl} alt=""/></td>
        </tr>
    )
}

export default Profile