import { NavLink } from 'react-router-dom'
import './Header.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../auth/auth/Auth'
import { jwtDecode } from 'jwt-decode'
import User from '../../../models/auth/User'
import useUsername from '../../../hooks/useUsername'

function Header(): JSX.Element {

    const { jwt, updateJwt } = useContext(AuthContext)
    const name = useUsername()

    function logout() {
        updateJwt('')
    }

    return (
        <div className='Header'>
            <div>
                logo
            </div>
            <nav>
                <NavLink to="/feed">Feed</NavLink>
                <NavLink to="/profile">Profile</NavLink>
            </nav>
            <div>
                Hello {name} | <button onClick={logout}>logout</button>
            </div>
        </div>
    )
}

export default Header