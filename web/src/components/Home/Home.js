import React, { useEffect, useState } from 'react'
import sneakersService from '../../services/sneakers'
import SneakerExclusive from './sneakerExclusive/SneakerExclusive'

import headerImg from '../../Images/HomePageHeadeer.jpg'
import jordanGif from '../../Images/HomePageLeftGif.gif'
import midImg from '../../Images/HomePage mid.jpg'

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
          {sneakers.map((sneaker) => <div key={sneaker.id}><SneakerExclusive {...sneaker}/></div>)}
        </div>
      </div>
      <div className='home-links'>
        <div className='size-and-button new-sneakers'>
          <Link to='/sneakers' className='btn btn--form btn-home'>Sneakers</Link>
        </div>
        <div className='size-and-button second-hand'>

        </div>
        <div className='size-and-button community'>

        </div>
        <div className='size-and-button about-us'>

        </div>
      </div>
    </div>
  )
}

export default Home