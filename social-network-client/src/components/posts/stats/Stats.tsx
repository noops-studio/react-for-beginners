import { useEffect, useState } from 'react'
import './Stats.css'
import profileService from '../../../services/profileService'

function Stats(): JSX.Element {

    const [ totalPosts, setTotalPosts ] = useState<number>()

    useEffect(() => {
        (async() => {
            try {
                const postsFromServer = await profileService.getProfile()
                setTotalPosts(postsFromServer.length)
            } catch (e) {
                alert(e)
            }
        })() 
    }, [])

    return (
        <div className='Stats'>
            <p>total posts: {totalPosts}</p>
        </div>
    )
}

export default Stats