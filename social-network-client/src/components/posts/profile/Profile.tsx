import { useContext, useEffect, useState } from 'react'
import './Profile.css'
// import profileService from '../../../services/profileService'
import PostModel from '../../../models/post/Post'
import Post from '../post/Post'
import NewPost from '../new/NewPost'
import PostDraft from '../../../models/post/PostDraft'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import Spinner from '../../common/spinner/Spinner'
import { add, init, remove } from '../../../redux/profileSlice'
import useTitle from '../../../hooks/useTitle'
import { AuthContext } from '../../auth/auth/Auth'
import ProfileService from '../../../services/authAware/ProfileService'
import useService from '../../../hooks/useService'

function Profile(): JSX.Element {

    // const [ posts, setPosts ] = useState<PostModel[]>([])
    const posts = useAppSelector(state => state.profile.posts)
    const dispatch = useAppDispatch()

    useTitle('Profile')

    const profileService = useService(ProfileService) 

    useEffect(() => {
        (async() => {
            try {
                if(posts.length === 0 ) {
                    const postsFromServer = await profileService.getProfile()
                    // we won't manage our state independentally any longer
                    // once we start using redux
                    // redux will do it for us
                    // setPosts(postsFromServer)
                    dispatch(init(postsFromServer))
                }
            } catch (e) {
                alert(e)
            }
        })()
    }, [])

    async function removePost(id: string) {
        try {
            await profileService.remove(id)
            // const postsAfterDeletion = [...posts]
            // const deleteIndex = postsAfterDeletion.findIndex(post => post.id === id)
            // postsAfterDeletion.splice(deleteIndex, 1)
            // setPosts(postsAfterDeletion)
            dispatch(remove({id}))
        } catch (e) {
            alert(e)
        }
    }

    async function createPost(draft: PostDraft) {
        try {
            const newPost = await profileService.create(draft)
            // setPosts([newPost, ...posts])
            dispatch(add(newPost))
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