import React from 'react'
import './SneakerExclusive.css'
import { Link } from 'react-router-dom'

function SneakerExclusive({ name, brand, price, images, id }) {
  return (

    <div className="container page-wrapper">
      <div className="page-inner">
        <div className="row">
          <div className="el-wrapper">
            <Link to={`/sneakers/${id}`}>
              <div className="box-up">
                <img className="img" src={images[0]} alt="" />
                  <div className="img-info">
                    <div className="info-inner">
                      <span className="p-name">{name}</span>
                      <span className="p-company">{brand}</span>
                    </div>
                  </div>
              </div>
            </Link>

            <div className="box-down">
              <div className="h-bg">
                <div className="h-bg-inner"></div>
              </div>

              {/* TODO CART BUTTON */}
              <a className="cart" href="#">
                <span className="price">{`${price}€`}</span>
                <span className="add-to-cart">
                  <span className="txt">Add in cart</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    /*<div className="sneaker-exclusive">
      <div>
        <img src={images[0]} className='bg-image-exclusive' alt={name} />
      </div>
      <div>
        <h5>{name}</h5>
        <p>{brand}</p>
        <p><b>{`${price}€`}</b></p>
      </div>
    </div>*/

  )
}

export default SneakerExclusive