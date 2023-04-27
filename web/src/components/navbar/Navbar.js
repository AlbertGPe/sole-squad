import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate()

  const handleClick = (ev) => {
    if (ev.target.innerText === 'Sneakers') {
      navigate('/sneakers')
    }
  }

  return (
    <nav className="navbar navbar-expand-lg justify-content-center">
      <div>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <button className='navBtn' onClick={handleClick}>Sneakers</button>
            <button className='navBtn'>Second Hand</button>
            <button className='navBtn'>Community</button>
            <button className='outstanding btn--doar'>About Us</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar