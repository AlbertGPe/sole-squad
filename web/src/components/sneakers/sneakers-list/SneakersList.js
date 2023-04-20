import React, { useEffect, useState } from 'react'
import sneakersService from '../../../services/sneakers'

function SneakersList() {
  const [sneakers, setSneakers] = useState([])

  useEffect(() => {
    sneakersService.list()
      .then((sneaker) => setSneakers(sneaker))
      .catch(error => console.error(error))
  }, [])

  return (
    <>
    <h1>Sneakers</h1>
      {sneakers.map((sneaker) => (
        <div key={sneaker.id}>{sneaker.name}</div>
      ))}
    </>
  )
}

export default SneakersList