import React from 'react'
import './Header.css'
import logo from '../../Images/sole-squad-logo-white.png'
import { Link, NavLink } from 'react-router-dom'

const renderHeaderLinkClassName = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'

function Header() {
  return (
    <header className='header'>
    <Link to="/">
      <img src={logo} alt="SoleSquadLogo" />
    </Link>
      <ul>
        <li className='nav-item'><NavLink to='/login' className={renderHeaderLinkClassName}>Login</NavLink></li>
        <li className='nav-item m-4'><NavLink to='/register' className={renderHeaderLinkClassName}>Register</NavLink></li>
      </ul>
    </header>
  )
}

export default Header