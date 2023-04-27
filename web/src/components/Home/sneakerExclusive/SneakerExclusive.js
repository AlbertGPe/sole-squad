import React from 'react'
import './SneakerExclusive.css'

function SneakerExclusive({ name, brand, price, images}) {
  return (
    <div className="sneaker-exclusive">
      <div>
        <img src={images[0]} className='bg-image-exclusive' alt={name} />
      </div>
      <div>
        <h5>{name}</h5>
        <p>{brand}</p>
        <p><b>{`${price}€`}</b></p>
      </div>
    </div>
  )
}

export default SneakerExclusive