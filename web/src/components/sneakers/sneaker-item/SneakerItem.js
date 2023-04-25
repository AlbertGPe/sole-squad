import React from 'react'

function SneakerItem({ sneaker }) {
  return (
    <div>
      <div>
        <img src={sneaker.images[0]} alt="sneaker" width={'500px'}/>
      </div>
      <div className='d-flex flex-column'>
        <span className='mt-2'><b>{sneaker.name}</b></span>
        <span className='mt-1'>{sneaker.brand}</span>
        <span className='mt-1'>{sneaker.gender}</span>
        <span className='mt-1'>{`${sneaker.price}€`}</span>
      </div>
    </div>
  )
}

export default SneakerItem