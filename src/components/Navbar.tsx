import { useLogout } from '../hooks/useLogout'
// style & images
import './Navbar.css'
import Temple from '../assets/temple.svg'
import { Link } from 'react-router-dom'

export default function Navbar() {
    const {logout, isPending } = useLogout()
    return (
        <div
            className='navbar'
        >
            <ul>
                <li className="logo">
                    <img src={Temple} alt="project management" />
                    <span>The PM</span>
                </li>

                <li>
                    <Link to='/login'> 
                        Login
                    </Link>
                </li>
                <li>
                    <Link to='/signup'> 
                        Signup
                    </Link>
                </li>
                <li>
                    {
                        !isPending 
                            ? <button 
                                className="btn"
                                onClick={logout}
                            >
                                Logout
                            </button>
                            : <button 
                                className="btn"
                                onClick={logout}
                            >
                                Logging out...
                            </button>
                    }
                    
                </li>
            </ul>
        </div>
    )
}
