import { useEffect, useState } from 'react'
import './Stats.css'
import profileService from '../../../services/profileService'
import { useAppSelector } from '../../../redux/hooks'

function Stats(): JSX.Element {

    const posts = useAppSelector(state => state.profile.posts)

    return (
        <div className='Stats'>
            <p>total posts: {posts.length}</p>
        </div>
    )
}

export default Stats