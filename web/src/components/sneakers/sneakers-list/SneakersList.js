import React from 'react'
import SneakerItem from '../sneaker-item/SneakerItem'
import './SneakersList.css'

function SneakersList({ search, sneakersFiltered }) {
 
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