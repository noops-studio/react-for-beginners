import { useEffect } from 'react'
import './EditPost.css'
import profileService from '../../../services/profileService'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import PostDraft from '../../../models/post/PostDraft'

function EditPost(): JSX.Element {

    const { id } = useParams<'id'>()
    const { register, handleSubmit, reset, formState } = useForm<PostDraft>();

    const navigate = useNavigate()

    useEffect(() => {
        (async() => {
            if (!id) return;
            const post = await profileService.getPost(id)
            const {title, body} = post
            reset({title, body})
        })()
    }, [])

    async function submit(draft: PostDraft) {
        try {
            if (!id) return;
            const updatedPost = await profileService.update(id, draft)
            navigate('/profile')
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='EditPost'>
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder="enter a title..." { ...register('title', {
                    required: {
                        value: true,
                        message: 'you must provide a title'
                    },
                    minLength: {
                        value: 10,
                        message: 'title must be at least 10 characters long'
                    }
                })}/>
                <span className='form-error'>{formState.errors.title?.message}</span>
                <textarea placeholder='enter a body...' {...register('body', {
                    required: {
                        value: true,
                        message: 'you must provide a body'
                    },
                    minLength: {
                        value: 20,
                        message: 'body must be at least 20 characters long'
                    }
                })}></textarea>
                <span className='form-error'>{formState.errors.body?.message}</span>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default EditPost