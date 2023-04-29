import React, { useEffect, useState } from 'react'
import sneakersService from '../../services/sneakers'
import SneakerExclusive from './sneakerExclusive/SneakerExclusive'

import headerImg from '../../Images/HomePageHeadeer.jpg'
import jordanGif from '../../Images/HomePageLeftGif.gif'

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

  const handleClick = () => {
    console.log(JSON.parse(localStorage.getItem('clientCart')))
  }

  return (
    <div className='homeBody'>
      <img onClick={handleClick} src={headerImg} alt='sneakers' className='w-100'/>
      <div className='d-flex p-5'>
        <div>
          <img src={jordanGif} alt="airJordanGif" className='air-jordan-gif'/>
        </div>
        <div className='exclusive-sneakers'>
          {sneakers.map((sneaker) => <div key={sneaker.id}><SneakerExclusive {...sneaker}/></div>)}
        </div>
      </div>
      <div className='home-links'>
        <div className='size-and-button new-sneakers'>
          <Link to='/sneakers' className='btn btn--form btn-home'>Sneakers</Link>
        </div>
        <div className='size-and-button second-hand'>
          <Link to='' className='btn btn--form btn-home'>Second Hand</Link>
        </div>
        <div className='size-and-button community'>
          <Link to='' className='btn btn--form btn-home'>Community</Link>
        </div>
        <div className='size-and-button about-us'>
          <Link to='' className='btn btn--form btn-home'>About us</Link>
        </div>
      </div>
    </div>
  )
}

export default Home