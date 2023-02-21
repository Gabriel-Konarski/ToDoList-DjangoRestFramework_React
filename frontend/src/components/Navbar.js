import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Navbar = () => {
    let { user, logoutUser } = useContext(AuthContext)
    return (
        <nav className='topNav'>
            <ul>
                <li><Link to='/'>Home Page</Link></li>
                <div className="dropdown">
                    {user && <button>{user.username}</button> || <button>Account</button>}

                    <div className='dropdown-content'>
                        {user && <Link to='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>Account</Link>}
                        {user && <a onClick={logoutUser}>Logout</a> || <Link to='login/'>Login</Link>}
                    </div>
                </div>
            </ul>
        </nav>
    )
}

export default Navbar