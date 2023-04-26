import React, { useEffect, useState } from 'react'
import sneakersService from '../../../services/sneakers'
import SneakerItem from '../sneaker-item/SneakerItem'
import './SneakersList.css'

function SneakersList({ search }) {
  const [sneakers, setSneakers] = useState([])

  useEffect(() => {
    sneakersService.list()
      .then((sneakers) => {
        const NewSneakers = sneakers.filter(sneaker => sneaker.new === true)
        setSneakers(NewSneakers)
      })
      .catch(error => console.error(error))
  }, [])

  const sneakersFiltered = sneakers.filter(sneaker => sneaker.name.toLowerCase().includes(search))

  return (
    <>
      {sneakersFiltered.length === 0 ? (
        <>
          <h1 className='m-3' style={{color: 'black', textAlign: 'center'}}>No Results</h1>
        </>
      ) : (
        <>
        <div className='sneaker-list'>
          {sneakersFiltered.map((sneaker) => (
            <div key={sneaker.id}><SneakerItem {...sneaker}/></div>
          ))}
        </div>
        </>
      )}
    </>   
  )
}

export default SneakersList