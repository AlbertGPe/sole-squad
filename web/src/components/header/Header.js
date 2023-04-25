import React, { useContext } from 'react'
import './Header.css'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthStore'

import logo from '../../Images/sole-squad-logo-white.png'
import sneakerLogo from '../../Images/running-shoes.png'
import loginIcon from '../../Images/login.png'
import registerIcon from '../../Images/edit.png'
import userIcon from '../../Images/user.png'
import bag from '../../Images/shopping-bag (2).png'

const renderHeaderLinkClassName = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'

function Header() {
  const { user, logout } = useContext(AuthContext)

  return (
    <header className='header'>
    <Link to="/">  
      <img src={sneakerLogo} alt="logo" width={'34px'} />
      <img src={logo} alt="SoleSquadLogo" />
    </Link>
      <ul>
        {(user?.email ? (
          <>
            <div className='dropdown'>
              <button className='btn dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={userIcon} alt="user-icon" width={'20px'} className='user-icon'/>
              </button>
              <ul className="dropdown-menu">
                <li><button className='nav-link dropdown-item'>My Profile</button></li>
                <li><button className='nav-link dropdown-item'>Edit Profile</button></li>
                <li><button className='nav-link dropdown-item' onClick={() => logout()}>Logout</button></li>
              </ul>
            </div>
            <div>
              <button className='btn'><img src={bag} alt="user-icon" width={'20px'} className='user-icon'/></button>
            </div>
          </>
        ) : (
          <>
            <li className='nav-item'><NavLink to='/login' className={renderHeaderLinkClassName}>Login<img src={loginIcon} alt="logo" width={'15px'} className='mx-2'/></NavLink></li>
            <li className='nav-item m-4'><NavLink to='/register' className={renderHeaderLinkClassName}>Register<img src={registerIcon} alt="logo" width={'15px'} className='mx-2'/></NavLink></li>
          </>
        ))}
       
      </ul>
    </header>
  )
}

export default Header