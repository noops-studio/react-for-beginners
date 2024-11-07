import { useEffect } from 'react'
import './Feed.css'
import useTitle from '../../../hooks/useTitle'

function Feed(): JSX.Element {

    useTitle('Feed')

    return (
        <div className='Feed'>
            Feed
        </div>
    )
}

export default Feed