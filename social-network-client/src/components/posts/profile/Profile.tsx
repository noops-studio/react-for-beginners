import { useEffect, useState } from 'react'
import './Profile.css'
import profileService from '../../../services/profileService'
import PostModel from '../../../models/post/Post'
import Post from '../post/Post'
import NewPost from '../new/NewPost'
import PostDraft from '../../../models/post/PostDraft'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import Spinner from '../../common/spinner/Spinner'

function Profile(): JSX.Element {

    const [ posts, setPosts ] = useState<PostModel[]>([])
    // const posts = useAppSelector(state => state.profile)
    // const dispatch = useAppDispatch()

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

    async function removePost(id: string) {
        try {
            await profileService.remove(id)
            const postsAfterDeletion = [...posts]
            const deleteIndex = postsAfterDeletion.findIndex(post => post.id === id)
            postsAfterDeletion.splice(deleteIndex, 1)
            setPosts(postsAfterDeletion)
        } catch (e) {
            alert(e)
        }
    }

    async function createPost(draft: PostDraft) {
        try {
            const newPost = await profileService.create(draft)
            setPosts([newPost, ...posts])
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='Profile'>

            {posts.length === 0 && <Spinner />}

            {posts.length > 0 && <>
                <NewPost createPost={createPost}/>
                {posts.map(post => <Post key={post.id} post={post} removePost={removePost}/>)}
            </>}

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