import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import sneakersService from '../../../services/sneakers'
import MyLoader from '../../Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthStore';

import "react-toastify/dist/ReactToastify.css";
import './SneakerDetail.css'

import arrow from '../../../Images/arrow.png'

function SneakerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sneaker, setSneaker] = useState();
  const [mainImage, setMainImage] = useState();
  const [cart, setCart] = useState([])
  const [size, setSize] = useState(undefined)
  const { user } = useContext(AuthContext)

  const toastSuccess = () => toast.success('Added to your cart!');
  const toastWarn  = () => toast.error('Please select a sneaker size');

  useEffect(() => {
    async function fetchSneakers() {
      try {
        const sneaker = await sneakersService.detail(id);
        setSneaker(sneaker)
        setMainImage(sneaker.images[0])
        setCart(JSON.parse(localStorage.getItem('clientCart')))
      } catch (error) {
        const statusCode = error.response?.status;
        if (statusCode === 404) {
          navigate('/404')
        }
      }
    }
    fetchSneakers();
  }, [id])

  const handleCart = () => {
    setSize(undefined)
    const item = { sneaker: sneaker, quantity: 1, size: size }
    if (!size) {
      toastWarn ();
    } else {
      if (cart) {
        if (!size) {
          toastWarn ();
        } else {
          const isInCart = cart.some((sneaker) => sneaker.sneaker.id === id && sneaker.size === size)
          if (isInCart) {
            const newCart = cart.map((sneaker) => {
              if (sneaker.sneaker.id === id && sneaker.size === size) {
                sneaker.quantity += 1
              }
              return sneaker;
            })
            setCart(newCart)
            localStorage.setItem('clientCart', JSON.stringify(newCart))
            toastSuccess();
          } else {
            setCart([...cart, item])
            localStorage.setItem('clientCart', JSON.stringify([...cart, item]))
            toastSuccess();
          }
        }
      } else {
        setCart([item])
        localStorage.setItem('clientCart', JSON.stringify([item]))
        toastSuccess();
      }
    }

  }

  const handleImageClick = (image) => {
    setMainImage(image)
  }

  const handleSizeClick = (size) => {
    setSize(size)
  }

  return (
    <>
      {!sneaker ? (<MyLoader />) : (
        <div className='detail-page'>
          <div className='sneaker-content'>
            <div className='div-main-image'><img src={mainImage} alt={sneaker.name} className='main-image' /></div>
            <div className='detail-footer-images'>
              {sneaker.images?.map((image) => <div key={image}><button onClick={() => handleImageClick(image)} className='btn-detail-images'><img src={image} alt="" className='detail-footer-image' /></button></div>)}
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
                      {sneaker.details?.map((detail) => <li key={detail}>{detail}</li>)}
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
          <div className='sidebar sticky-top'>
            <h1>{sneaker.name}</h1>
            <p>{sneaker.brand}</p>
            <b><p>{`${sneaker.price}€`}</p></b>
            <p>{sneaker.gender}</p>
            <div>
              <div className='heading-container-sizes'>
                <b><span>Sizes</span></b>
              </div>
              <div className='container-sizes mt-2'>
                {!sneaker.size_range ? (
                  <>
                  <button key={sneaker.size} onClick={() => handleSizeClick(sneaker.size)} className='button-size'><span>{sneaker.size}</span></button>
                  </>
                  ) : (
                  <>
                    {sneaker.size_range?.map((size) => <button key={size} onClick={() => handleSizeClick(size)} className='button-size'><span>{size}</span></button>)}
                  </>
                )}
              </div>
            </div>
            <div>
              {user ? (
                <button className='btn btn--form mt-5' onClick={handleCart}>Add To Cart <img src={arrow} alt="" width={'15px'} className='mb-1 ms-2' /></button>
              ) : (
                <div>
                <div>
                <button className='btn btn--form mt-5' disabled>Add To Cart <img src={arrow} alt="" width={'15px'} className='mb-1 ms-2' /></button>
                </div>                
                  <Link to='/login' className='signup__link'>Log in to add sneakers to your cart</Link>
                </div>
              )}
              <div class="icon-container">
                    <i class="fa fa-cc-visa me-1" style={{color:'navy'}}></i>
                    <i class="fa fa-cc-amex me-1" style={{color:'blue'}}></i>
                    <i class="fa fa-cc-mastercard me-1" style={{color:'red'}}></i>
                    <i class="fa fa-cc-discover" style={{color:'orange'}}></i>
                  </div>
            </div>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      )}
    </>
  )
}

export default SneakerDetail