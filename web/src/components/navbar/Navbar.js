import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate()

  const handleClick = (ev) => {
    if (ev.target.innerText === 'Sneakers') {
      navigate('/sneakers')
    } else if (ev.target.innerText === 'About Us') {
      navigate('/about')
    } else if (ev.target.innerText === 'Community') {
      navigate('/users')
    } else if (ev.target.innerText === 'Second Hand') {
      navigate('/second-hand')
    }
  }

  return (
    <nav className="navbar navbar-expand-lg justify-content-center">
      <div>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <button className='navBtn' onClick={handleClick}>Sneakers</button>
            <button className='navBtn' onClick={handleClick}>Second Hand</button>
            <button className='navBtn' onClick={handleClick}>Community</button>
            <button className='outstanding btn--doar' onClick={handleClick}>About Us</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar