import React from 'react'
import { Link } from 'react-router-dom'
import '../sneaker-detail/SneakerDetail.css'

function SneakerItem({ name, brand, gender, price, images, id }) {

  return (
    <Link to={`/sneakers/${id}`} style={{textDecoration: 'none', color: 'black'}}>
      <div className='img-sneakers-list'>
        <img src={images[0]} className='img-sneakers-list-cover' alt="sneaker" width={'500px'}/>
      </div>
      <div className='d-flex flex-column'>
        <span className='mt-2'><b>{name}</b></span>
        <span className='mt-1'>{brand}</span>
        <span className='mt-1'>{gender}</span>
        <span className='mt-1'><b>{`${price}€`}</b></span>
      </div>
    </Link>
  )
}

export default SneakerItem