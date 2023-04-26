import React from 'react'

function SneakerItem({ name, brand, gender, price, images }) {
  return (
    <div>
      <div>
        <img src={images[0]} alt="sneaker" width={'500px'}/>
      </div>
      <div className='d-flex flex-column'>
        <span className='mt-2'><b>{name}</b></span>
        <span className='mt-1'>{brand}</span>
        <span className='mt-1'>{gender}</span>
        <span className='mt-1'><b>{`${price}€`}</b></span>
      </div>
    </div>
  )
}

export default SneakerItem