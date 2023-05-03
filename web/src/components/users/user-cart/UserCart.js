import React, { useContext, useEffect, useState } from 'react'
import './UserCart.css'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthStore';

function UserCart() {

  const [filteredCart, setFiltereedCart] = useState();
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/403')
    }
    setFiltereedCart(JSON.parse(localStorage.getItem('clientCart')))
  }, [])

  return (
    <>
      {!filteredCart ? (
        <div className='mt-5' style={{fontSize:'30px'}}>
          <p><strong>Your cart is empty!</strong></p>
        </div>
      ) : (
        <div className='container-cart mb-4'>
          <h1 className='text-center mb-5'><b>YOUR CART</b></h1>
          {filteredCart.map((sneaker) => 
            <div key={sneaker.sneaker.id} className='d-flex justify-content-between border-bottom'>
              <div className='d-flex'>
                <div className='me-4'>
                  <img src={sneaker.sneaker.images[0]} alt="" width={'200px'} className='my-2'/>
                </div>
                <div className='d-flex flex-column justify-content-center'>
                  <span>{sneaker.sneaker.name}</span>
                  <span>{`${sneaker.sneaker.price}€`}</span>
                  <span>{sneaker.sneaker.gender}</span>
                  <span>{`Size: ${sneaker.size}`}</span>
                </div>
              </div>
              <div className='d-flex align-items-center me-2'>
                <span><b>{`Quantity: ${sneaker.quantity}`}</b></span>
              </div>
            </div>)}
            <div className='mt-3 d-flex justify-content-evenly'>
              <Link to='/sneakers' className='btn btn--form'>continue shopping</Link>
              <Link to='/payment' className='btn btn--form'>pay cart</Link>
            </div>
        </div>
      )}
    </>
  )
}

export default UserCart