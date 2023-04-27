import React from 'react'
import { Link } from 'react-router-dom'

function SneakerItem({ name, brand, gender, price, images, id }) {

  return (
    <Link to={`/sneakers/${id}`} style={{textDecoration: 'none', color: 'black'}}>
      <div>
        <img src={images[0]} alt="sneaker" width={'500px'}/>
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