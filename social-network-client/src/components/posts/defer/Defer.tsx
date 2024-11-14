import { FormEvent, memo, useCallback, useDeferredValue, useEffect, useState } from 'react'
import './Defer.css'
import useService from '../../../hooks/useService'
import CommentsService from '../../../services/authAware/CommentsService'
import Comment from '../../../models/comment/Comment'
import PostComment from '../commentSlow/PostCommentSlow'

function Defer(): JSX.Element {

    const [ query, setQuery ] = useState<string>('')
    const [ comments, setComments ] = useState<Comment[]>([])

    const deferredQuery = useDeferredValue(query)

    const commentService = useService(CommentsService)

    useEffect(() => {
        (async() => {
            const commentsFromServer = await commentService.getAll()
            setComments(commentsFromServer)
        })()
    }, [])

    function queryChanged(event: FormEvent<HTMLInputElement>) {
        const query = event.currentTarget.value
        setQuery(query)
    }

    function someFunc() {
        console.log('jsut a useless function for demo')
    }

    const someFuncMemoed = useCallback(() => {
        someFunc()
    }, [])

    return (
        <div className='Defer'>
            <input placeholder='search comments...' value={query} onChange={queryChanged}/>
            <MemoDeferList comments={comments} query={deferredQuery} someFunc={someFuncMemoed}/>
        </div>
    )
}

interface DeferListProps {
    query: string,
    comments: Comment[],
    someFunc: Function
}
function DeferList(props: DeferListProps): JSX.Element {

    const filterredComments = props.comments.filter(comment => comment.body.toLowerCase().includes(props.query.toLowerCase()))

    return (
        <div className='DeferList'>
            {filterredComments.map(comment => <PostComment key={comment.id} comment={comment}/>)}
        </div>
    )
}

const MemoDeferList = memo(DeferList)

export default Defer