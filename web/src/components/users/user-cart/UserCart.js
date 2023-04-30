import React, { useEffect, useState } from 'react'
import sneakerService from '../../../services/sneakers'
import MyLoader from '../../Loader/Loader';

function UserCart() {
  const [sneakers, setSneakers] = useState();
  const [cart, setCart] = useState();

  useEffect(() => {
    async function fetchSneakers() {
      try {
        const sneakers = await sneakerService.list();
        setSneakers(sneakers)
        setCart(JSON.parse(localStorage.getItem('clientCart')))
        
        
      } catch (error) {
        console.error(error)
      }
    }
    fetchSneakers()
  }, [])

  if(sneakers) {
    const sneakersCart = cart.map((item) => item.sneakerId).map((item) => sneakers.filter((sneaker) => sneaker.id === item))
    console.log(sneakersCart)
  }

  return (
    <>
      {!sneakers ? (<MyLoader />) : (
        <>
          {/*{sneakersCart.map((sneaker) => sneaker.map((item) => <div>{item}</div>))}*/}
        </>
      )}
    </>
  )
}

export default UserCart