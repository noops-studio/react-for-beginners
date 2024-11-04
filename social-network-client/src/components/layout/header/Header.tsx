import { NavLink } from 'react-router-dom'
import './Header.css'

function Header(): JSX.Element {
    return (
        <div className='Header'>
            <div>
                logo
            </div>
            <nav>
                <NavLink to="/feed">Feed</NavLink>
                <NavLink to="/profile">Profile</NavLink>
            </nav>
        </div>
    )
}

export default Header