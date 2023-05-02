import React, { useEffect, useState } from 'react'
import sneakerService from '../../../services/sneakers'
import MyLoader from '../../Loader/Loader';

function UserCart() {

  const [filteredCart, setFiltereedCart] = useState();
  
  useEffect(() => {
    setFiltereedCart(JSON.parse(localStorage.getItem('clientCart')))
  }, [])


  

  return (
    <>
      {!filteredCart ? (<MyLoader />) : (
        <>
          {filteredCart.map((sneaker) => <div>
          {sneaker.size}
          {sneaker.quantity}
          </div>)}
        </>
      )}
    </>
  )
}

export default UserCart