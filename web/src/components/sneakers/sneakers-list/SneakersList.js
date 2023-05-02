import React from 'react'
import SneakerItem from '../sneaker-item/SneakerItem'
import './SneakersList.css'

function SneakersList({ sneakersFiltered }) {
 
  return (
    <div className='bg'>
      {sneakersFiltered.length === 0 ? (
        <>
          <h1 className='m-3' style={{color: 'black', textAlign: 'center'}}>No Results</h1>
        </>
      ) : (
        <>
        <div className='sneaker-list'>
          {sneakersFiltered.map((sneaker) => (
            <div key={sneaker.id} className='m-1 my-2'><SneakerItem {...sneaker}/></div>
          ))}
        </div>
        </>
      )}
    </div>   
  )
}

export default SneakersList