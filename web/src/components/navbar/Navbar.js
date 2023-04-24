import React from 'react'
import ('./Navbar.css');

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg justify-content-center">
      <div>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <button className='navBtn'>Sneakers</button>
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