import Stats from '../../posts/stats/Stats'
import './Footer.css'

function Footer(): JSX.Element {
    return (
        <div className='Footer'>
            <Stats />
            <span>server is {process.env.REACT_APP_REST_SERVER}</span>
        </div>
    )
}

export default Footer