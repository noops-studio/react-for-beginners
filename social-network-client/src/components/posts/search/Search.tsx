import { FormEvent, memo, useEffect, useRef, useState } from 'react'
import './Search.css'
import useService from '../../../hooks/useService'
import CommentsService from '../../../services/authAware/CommentsService'
import Comment from '../../../models/comment/Comment'
// import PostComment from '../comment/PostComment'
import PostComment from '../commentSlow/PostCommentSlow'

const MemoPostComment = memo(PostComment)

function Search(): JSX.Element {

    const commentService = useService(CommentsService)

    const comments = useRef<Comment[]>([])

    const [ filterredComments, setFilterredComments ] = useState<Comment[]>([])

    useEffect(() => {
        (async() => {
            const commentsFromServer = await commentService.getAll()
            comments.current = commentsFromServer
            setFilterredComments(commentsFromServer)
        })()
    }, [])

    function queryChanged(event: FormEvent<HTMLInputElement>) {
        const query = event.currentTarget.value
        const filteredComments = comments.current.filter(comment => comment.body.toLowerCase().includes(query.toLowerCase()))
        setFilterredComments(filteredComments)
    }

    return (
        <div className='Search'>
            <input placeholder='search comments' onChange={queryChanged}/>
            {filterredComments.map(comment => <MemoPostComment key={comment.id} comment={comment}/>)}
        </div>
    )
}

export default Search