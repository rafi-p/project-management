import {NavLink} from 'react-router-dom'
// styles & images
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Sidebar() {
    const { state } = useAuthContext()
    return (
        <div className='sidebar'>
            <div className="sidebar-content">
                <div className="user">
                    <Avatar src={state?.user?.photoURL!} />
                    <p>Hey {state?.user?.displayName}</p>
                </div>
                <nav className="links">
                    <ul>
                        <li>
                            <NavLink to='/'>
                                <img src={DashboardIcon} alt="dashboard icon" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/create'>
                                <img src={AddIcon} alt="add project icon" />
                                <span>New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>        
        </div>
    )
}
