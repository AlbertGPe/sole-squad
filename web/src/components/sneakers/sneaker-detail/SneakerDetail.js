import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import sneakersService from '../../../services/sneakers'
import MyLoader from '../../Loader/Loader';
import './SneakerDetail.css'

import arrow from '../../../Images/arrow.png'
import visa from '../../../Images/visa.jpg'
import mastercard from '../../../Images/mastercard.jpg'
import paypal from '../../../Images/paypal.png'

function SneakerDetail() {
  const { id } = useParams();
  const [sneaker, setSneaker] = useState();
  const [mainImage, setMainImage] = useState();
  const [cart, setCart] = useState([])

  useEffect(() => {
    async function fetchSneakers() {
      try {
        const sneaker = await sneakersService.detail(id)
        setSneaker(sneaker)
        setMainImage(sneaker.images[0])
        setCart(JSON.parse(localStorage.getItem('clientCart')))
      } catch (error) {
        console.error(error)
      }
    }
    fetchSneakers();
  }, [id])

  //JSON.parse(localstorage.getItem('clientCart')) -> tendra que ir en un estado

  const handleCart = () => {

    const item = { sneakerId: id, quantity: 1 }
    if (cart) {
      const isInCart = cart.some((sneaker) => sneaker.sneakerId === id)
      if (isInCart) {
        const newCart = cart.map((sneaker) => {
          if (sneaker.sneakerId === id) {
            sneaker.quantity += 1
          }
          return sneaker;
        })
        setCart(newCart)
        localStorage.setItem('clientCart', JSON.stringify(newCart))
      } else {
        setCart([...cart, item])
        localStorage.setItem('clientCart', JSON.stringify([...cart, item]))
      }
    } else {
      setCart([item])
      localStorage.setItem('clientCart', JSON.stringify([item]))
    }
  }

  const handleImageClick = (image) => {
    setMainImage(image)
  }

  return (
    <>
      {!sneaker ? (<MyLoader />) : (
        <div className='detail-page'>
          <div className='sneaker-content'>
            <div className='div-main-image'><img src={mainImage} alt={sneaker.name} className='main-image' /></div>
            <div className='detail-footer-images'>
              {sneaker.images.map((image) => <div key={image}><button onClick={() => handleImageClick(image)} className='btn-detail-images'><img src={image} alt="" className='detail-footer-image'/></button></div>)}
              {sneaker.colors_images[0]}
            </div>
            <div className="accordion accordion-detail" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <strong>Description</strong>
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p>{sneaker.description}</p>
                  </div>
                </div>
              </div>
              {sneaker.details.length > 0 && 
              <div className="accordion-item detail-accordion-position">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <strong>Details</strong>
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    {sneaker.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </div>
                </div>
              </div>
              }           
            </div>
          </div>
          <div className='sidebar'>
            <h1>{sneaker.name}</h1>
            <p>{sneaker.brand}</p>
            <b><p>{`${sneaker.price}€`}</p></b>
            <p>{sneaker.gender}</p>
            <div>
              <div className='heading-container-sizes'>
                <b><span>Sizes</span></b>
              </div>
              <div className='container-sizes mt-2'>
                {sneaker.size_range.map((size) => <button key={size} className='button-size'><span>{size}</span></button>)}
              </div>
            </div>
            <div>
              <button className='btn btn--form mt-5' onClick={handleCart}>Add To Cart <img src={arrow} alt="" width={'15px'} className='mb-1 ms-2' /></button>
              <p className='mt-2'>
                <img src={visa} alt="visa" width={'50px'} className='me-2' />
                <img src={mastercard} alt="mastercad" width={'50px'} className='me-2' />
                <img src={paypal} alt="paypal" width={'100px'} />
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SneakerDetail