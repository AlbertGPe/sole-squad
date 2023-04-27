import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import sneakersService from '../../../services/sneakers'
import MyLoader from '../../Loader/Loader';

function SneakerDetail() {
  const  { id }  = useParams();
  const [sneaker, setSneaker] = useState();

  useEffect(() => {
    async function fetchSneakers() {
      try {
        const sneaker = await sneakersService.detail(id)
        //console.log(sneaker)
        setSneaker(sneaker)
      } catch (error) {
        console.error(error)
      } 
    }
    fetchSneakers();
  }, [id])

  return (
    <>
      {!sneaker ? (<MyLoader />) : (
        <>
          <h1 style={{color: 'black'}}>{sneaker.name}</h1>
        </>
      )}
    </>
  )
}

export default SneakerDetail