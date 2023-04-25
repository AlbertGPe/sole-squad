import React, { useEffect, useState } from 'react'
import sneakersService from '../../../services/sneakers'
import SneakerItem from '../sneaker-item/SneakerItem'
import './SneakersList.css'

function SneakersList() {
  const [sneakers, setSneakers] = useState([])

  useEffect(() => {
    sneakersService.list()
      .then((sneakers) => {
        const NewSneakers = sneakers.filter(sneaker => sneaker.new === true)
        setSneakers(NewSneakers)
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <div className='sneaker-list'>
      {sneakers.map((sneaker) => (
        <div key={sneaker.id}><SneakerItem sneaker={sneaker}/></div>
      ))}
    </div>
  )
}

export default SneakersList