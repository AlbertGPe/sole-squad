import React, { useEffect, useState } from 'react'
import sneakersService from '../../services/sneakers'
import SneakerExclusive from './sneakerExclusive/SneakerExclusive'

import headerImg from '../../Images/HomePageHeadeer.jpg'
import jordanGif from '../../Images/HomePageLeftGif.gif'
import exclusive from '../../Images/exclusive.jpg'
import ps1Sneaker from '../../Images/ps1sneaker.gif'

import './Home.css'
import { Link } from 'react-router-dom'

function Home() {
  const [sneakers, setSneakers] = useState([])

  useEffect(() => {
    sneakersService.list()
      .then((sneakers) => {
        const exclusiveSneakers = sneakers.filter(sneaker => sneaker.exclusive === true)
        setSneakers(exclusiveSneakers)
      })
      .catch(error => console.error(error)) 
  }, [])

  return (
    <div className='homeBody'>
      <img src={headerImg} alt='sneakers' className='w-100'/>
      <div className='d-flex p-5'>
        <div>
          <img src={jordanGif} alt="airJordanGif" className='air-jordan-gif'/>
        </div>
        <div className='exclusive-sneakers'>
          <div className='exclusive'>
            <img src={exclusive} alt="exclusive" />
          </div>
          <div className='two-exclusive-sneakers'>
            {sneakers.slice(0,2).map((sneaker) => <div key={sneaker.id}><SneakerExclusive {...sneaker}/></div>)}
          </div>
        </div>
      </div>
      <div className='d-flex p-5'>
        <div className='exclusive-sneakers'>
          <div className='exclusive'>
            <img src={exclusive} alt="exclusive" />
          </div>
          <div className='two-exclusive-sneakers'>
            {sneakers.slice(2,4).map((sneaker) => <div key={sneaker.id}><SneakerExclusive {...sneaker}/></div>)}
          </div>
        </div>
        <div>
          <img src={ps1Sneaker} alt="airJordanGif" className='air-jordan-gif'/>
        </div>
      </div>
      <div className='border-bottom-home'></div>
      <div className='home-links'>
        <div className='size-and-button new-sneakers'>
          <Link to='/sneakers' className='btn btn--form btn-home'>Sneakers</Link>
        </div>
        <div className='size-and-button second-hand'>
          <Link to='' className='btn btn--form btn-home'>Second Hand</Link>
        </div>
        <div className='size-and-button community'>
          <Link to='/users' className='btn btn--form btn-home'>Community</Link>
        </div>
        <div className='size-and-button about-us'>
          <Link to='/about' className='btn btn--form btn-home'>About us</Link>
        </div>
      </div>
    </div>
  )
}

export default Home