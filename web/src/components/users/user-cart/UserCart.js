import React, { useContext, useEffect, useState } from 'react'
import './UserCart.css'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthStore';

function UserCart() {

  const [filteredCart, setFiltereedCart] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/403')
    }
    setFiltereedCart(JSON.parse(localStorage.getItem('clientCart')))
    total();
  }, [])

  const handleClickRemove = (sneaker) => {
    const filterDeleted = filteredCart.filter((cartItem) => cartItem.size !== sneaker.size || cartItem.sneaker.id !== sneaker.sneaker.id) 
    localStorage.setItem('clientCart', JSON.stringify(filterDeleted))
    setFiltereedCart(filterDeleted)
    total();
  }

  const total = () => {
    const cart = JSON.parse(localStorage.getItem('clientCart'))
    const prices = cart?.map((sneaker) => Number(sneaker.sneaker.price))
    let total = prices?.reduce((a, b) => a + b, 0)
    setTotalPrice(total)
  }

  return (
    <>
      {!filteredCart ? (
        <div className='mt-5' style={{fontSize:'30px'}}>
          <p><strong>Your cart is empty!</strong></p>
        </div>
      ) : (
        <div className='container-cart mb-4'>
          <h1 className='text-center mb-5'><b>YOUR CART</b></h1>
          {filteredCart?.map((sneaker, i) => 
            <div key={i} className='d-flex justify-content-between border-bottom'>
              <div className='d-flex'>
                <div className='me-4'>
                  <img src={sneaker.sneaker.images[0]} alt="" width={'200px'} className='my-2'/>
                </div>
                <div className='d-flex flex-column justify-content-center'>
                  <li>{sneaker.sneaker.name}</li>
                  <li>{`${sneaker.sneaker.price}€`}</li>
                  <li>{sneaker.sneaker.gender}</li>
                  <li>{`Size: ${sneaker.size}`}</li>
                </div>
              </div>
              <div className='d-flex align-items-center me-2'>
                <div className='me-5'>
                  <span><b>{`Quantity: ${sneaker.quantity}`}</b></span>
                </div>
                <div>
                  <button className='btn btn-danger' onClick={() => handleClickRemove(sneaker)}>Remove</button>
                </div>
              </div>
            </div>)}
            <div className='mt-3 d-flex justify-content-evenly align-items-center'>
              <Link to='/sneakers' className='btn btn--form'>continue shopping</Link>
              <Link to='/payment' className='btn btn--form'>pay cart</Link>
              <span className='border p-1'><strong>Total Price: {totalPrice}</strong></span>
            </div>
        </div>
      )}
    </>
  )
}

export default UserCart