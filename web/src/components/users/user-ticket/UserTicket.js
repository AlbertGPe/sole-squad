import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthStore'

function UserTicket() {
  const [cartPayed, setcartPayed] = useState()
  const { cart } = useContext(AuthContext)

  useEffect(() => {
    setcartPayed(cart)
  }, [])

  const handleClickDeleteLocal = () => {
    localStorage.removeItem('clientCart')
  }
 
  return (
    <div className='container-cart mb-4'>
      <h4 className='text-center mb-5'><i className="fa-solid fa-circle-check me-2" style={{color: '#44bb35'}}></i><b>Purchase completed! Thank you for trusting us!</b></h4>
      <h5 className='text-center'><strong>Your purchase:</strong></h5>
      {cartPayed?.map((sneaker) =>
        <div key={sneaker.sneaker.id} className='d-flex justify-content-between border-bottom'>
          <div className='d-flex'>
            <div className='me-4'>
              <img src={sneaker.sneaker.images[0]} alt="" width={'200px'} className='my-2' />
            </div>
            <div className='d-flex flex-column justify-content-center'>
              <span>{sneaker.sneaker.name}</span>
              <span>{`${sneaker.sneaker.price}€`}</span>
              <span>{sneaker.sneaker.gender}</span>
              <span>{`Size: ${sneaker.size}`}</span>
            </div>
          </div>
          <div className='d-flex align-items-center me-2'>
            <div className='me-5'>
              <span><b>{`Quantity: ${sneaker.quantity}`}</b></span>
            </div>
          </div>
        </div>)}
      <div className='mt-3 d-flex justify-content-evenly'>
        <Link to='/'><button className='btn btn--form' onClick={handleClickDeleteLocal}>Close</button></Link>
      </div>
    </div>
  )
}

export default UserTicket