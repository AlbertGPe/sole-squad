import React from 'react'
import './AboutUs.css'

import logo from '../../Images/sole-squad-logopng.png'

function AboutUs() {
  return (
    <div className='body-about'>
      <h1>Welcome to SoleSquad!</h1>
      <p>We're a company that's passionate about delivering products that make people's lives easier and more enjoyable. Our team of experts is dedicated to delivering the best possible experience to our customers, from innovative design to exceptional customer service.</p>  
      <p>Founded in 2005, we started as a small business with a big vision: to change the world. Since then, we've grown into a thriving company with offices all over the world, but we're still committed to our founding values of honesty, integrity, and hard work.</p>
      <p>We've had the pleasure of working with some amazing clients over the years, including Google, Apple, and Amazon. We're grateful for the trust they've placed in us and proud of the work we've done together.</p>
      <p>If you have any questions or want to learn more about our products and services, please don't hesitate to get in touch. You can reach us at 555-1234 or email us at sole@solesquad.com. And don't forget to connect with us on social media for news and updates about our company!</p>
      <img src={logo} alt='logo' className='mt-5' width={'300px'}/>
    </div>
  )
}

export default AboutUs