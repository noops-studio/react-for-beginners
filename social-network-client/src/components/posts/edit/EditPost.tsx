import { useEffect } from 'react'
import './EditPost.css'
import profileService from '../../../services/profileService'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import PostDraft from '../../../models/post/PostDraft'

function EditPost(): JSX.Element {

    const { id } = useParams<'id'>()
    const { register, handleSubmit, reset, formState } = useForm<PostDraft>();

    useEffect(() => {
        (async() => {
            if (!id) return;
            const post = await profileService.getPost(id)
        })()
    }, [])

    return (
        <div className='EditPost'>
            edit
        </div>
    )
}

export default EditPost