import { useForm } from 'react-hook-form'
import './NewPost.css'
import PostDraft from '../../../models/post/PostDraft';
import { useState } from 'react';

interface NewPostProps {
    createPost (draft: PostDraft): Promise<void>
}
function NewPost(props: NewPostProps): JSX.Element {

    const { register, handleSubmit, reset, formState } = useForm<PostDraft>();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    async function submit(draft: PostDraft) {
        setIsSubmitting(true)
        try {
            await props.createPost(draft)
            reset()
        } catch (e) {
            throw e
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='NewPost'>
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder="enter a title..." { ...register('title', {
                    required: {
                        value: true,
                        message: 'you must provide a title'
                    },
                    // minLength: {
                    //     value: 10,
                    //     message: 'title must be at least 10 characters long'
                    // }
                })}/>
                <span className='form-error'>{formState.errors.title?.message}</span>
                <textarea placeholder='enter a body...' {...register('body', {
                    required: {
                        value: true,
                        message: 'you must provide a body'
                    },
                    // minLength: {
                    //     value: 20,
                    //     message: 'body must be at least 20 characters long'
                    // }
                })}></textarea>
                <span className='form-error'>{formState.errors.body?.message}</span>
                {!isSubmitting && <button>Submit</button>}
                {isSubmitting && <p>creating new post...</p>}

                
            </form>
        </div>
    )
}

export default NewPost