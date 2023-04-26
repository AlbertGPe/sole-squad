import React from 'react'

function SneakerExclusive({ name, brand, price, images}) {
  return (
    <div className="card mx-2" style={{width: '25rem'}}>
      <img src={images[0]} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{brand}</p>
        <p className="card-text"><b>{`${price}€`}</b></p>
      </div>
    </div>
  )
}

export default SneakerExclusive