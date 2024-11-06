import { useForm } from 'react-hook-form'
import './NewPost.css'
import PostDraft from '../../../models/post/PostDraft';

interface NewPostProps {
    createPost: Function
}
function NewPost(props: NewPostProps): JSX.Element {

    const { register, handleSubmit, reset } = useForm<PostDraft>();

    async function submit(draft: PostDraft) {
        await props.createPost(draft)
        reset()
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