import { useForm } from 'react-hook-form'
import './NewPost.css'
import PostDraft from '../../../models/post/PostDraft';
import profileService from '../../../services/profileService';

function NewPost(): JSX.Element {

    const { register, handleSubmit } = useForm<PostDraft>();

    async function submit(draft: PostDraft) {
        console.log(draft)
        try {
            // const newPost = await profileService.create(draft)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='NewPost'>
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder="enter a title..." { ...register('title')}/>
                <textarea placeholder='enter a body...' {...register('body')}></textarea>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default NewPost