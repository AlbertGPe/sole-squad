import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import './UserPayment.css'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthStore';

function UserPayment() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm({ mode: 'onBlur' });
  const [serverError, setServerError] = useState(undefined);
  const { user, getLocalStorageCart } = useContext(AuthContext)
  const navigate = useNavigate();

  const toastSuccess = () => toast('🦄 Wow so easy!', {
    position: "top-center",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    delay: 3000,
  });

  useEffect(() => {
    if (!user) {
      navigate('/403')
    }
  }, [])

  const handleSubmitPayment = async () => {
    try {
      getLocalStorageCart();
      localStorage.removeItem('clientCart')
      navigate('/user-ticket')
      toastSuccess();
    } catch (error) {
      const errors = error.response?.data?.errors
      if (errors) {
        Object.keys(error)
          .forEach((errorName) => setError(errorName, { message: errors[errorName] }))
      } else {
        setServerError(error.message)
      }
    }
  }

  return (
    <div className="payment-body">
      <div className="row-payment">
        <div className="col-75">
          <div className="payment-container">
            <form onSubmit={handleSubmit(handleSubmitPayment)}>
              {serverError && <div className='alert alert-danger d-none d-lg-block'>{serverError}</div>}
              <div className="row-payment">
                <div className="col-50">
                  <h3>Billing Address</h3>
                  {/* NAME */}

                  <label className="label-payment-class" htmlFor="fname"><i className="fa fa-user"></i> Full Name</label>
                  <input className={`form-control ${errors.fname ? 'is-invalid' : ''} input-payment-class`} type="text" id="fname" name="firstname" placeholder=""
                    {...register('fname', { required: 'Name is required' })} />
                  {errors.fname && <div className='invalid-feedback'>{errors.fname?.message}</div>}

                  {/* EMAIL */}
                  <label className="label-payment-class" htmlFor="email"><i className="fa fa-envelope"></i> Email</label>
                  <input className={`form-control ${errors.email ? 'is-invalid' : ''} input-payment-class`} type="text" id="email" name="email" placeholder=""
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'User email must be valid'
                      }
                    })} />
                  {errors.email && <div className='invalid-feedback'>{errors.email?.message}</div>}

                  {/* ADRESS */}
                  <label className="label-payment-class" htmlFor="adr"><i className="fa fa-address-card-o"></i> Address</label>
                  <input className={`form-control ${errors.adr ? 'is-invalid' : ''} input-payment-class`} type="text" id="adr" name="address" placeholder=""
                    {...register('adr', { required: 'Adress is required' })} />
                  {errors.adr && <div className='invalid-feedback'>{errors.adr?.message}</div>}

                  {/* CITY */}
                  <label className="label-payment-class" htmlFor="city"><i className="fa fa-institution"></i> City</label>
                  <input className={`form-control ${errors.city ? 'is-invalid' : ''} input-payment-class`} type="text" id="city" name="city" placeholder=""
                    {...register('city', { required: 'City is required' })} />
                  {errors.city && <div className='invalid-feedback'>{errors.city?.message}</div>}

                  <div className="row-payment">
                    <div className="col-50">
                      {/* COUNTRY */}
                      <label className="label-payment-class" htmlFor="state">country</label>
                      <input className={`form-control ${errors.state ? 'is-invalid' : ''} input-payment-class`} type="text" id="state" name="state" placeholder=""
                        {...register('state', { required: 'State is required' })} />
                      {errors.state && <div className='invalid-feedback'>{errors.state?.message}</div>}
                    </div>
                    <div className="col-50">
                      {/* ZIP */}
                      <label className="label-payment-class" htmlFor="zip">Zip</label>
                      <input className={`form-control ${errors.zip ? 'is-invalid' : ''} input-payment-class`} type="text" id="zip" name="zip" placeholder=""
                        {...register('zip', { required: 'Zip is required' })} />
                      {errors.zip && <div className='invalid-feedback'>{errors.zip?.message}</div>}
                    </div>
                  </div>
                </div>

                <div className="col-50">
                  <h3>Payment</h3>
                  <label htmlFor="fname">Accepted Cards</label>
                  <div className="icon-container">
                    <i className="fa fa-cc-visa me-1" style={{ color: 'navy' }}></i>
                    <i className="fa fa-cc-amex me-1" style={{ color: 'blue' }}></i>
                    <i className="fa fa-cc-mastercard me-1" style={{ color: 'red' }}></i>
                    <i className="fa fa-cc-discover" style={{ color: 'orange' }}></i>
                  </div>
                  {/* CARD NAME */}
                  <label className="label-payment-class" htmlFor="cname">Name on Card</label>
                  <input className={`form-control ${errors.cname ? 'is-invalid' : ''} input-payment-class`} type="text" id="cname" name="cardname" placeholder=""
                    {...register('cname', { required: 'Card name is required' })} />
                  {errors.cname && <div className='invalid-feedback'>{errors.cname?.message}</div>}

                  {/* CREDIT CARD */}
                  <label className="label-payment-class" htmlFor="ccnum">Credit card number</label>
                  <input className={`form-control ${errors.ccnum ? 'is-invalid' : ''} input-payment-class`} type="text" id="ccnum" name="cardnumber" placeholder=""
                    {...register('ccnum', {
                      required: 'Credit card number is required',
                      minLength: { value: 16, message: "Enter a real credit card" },
                      maxLength: { value: 16, message: "Enter a real credit card" }
                    })} />
                  {errors.ccnum && <div className='invalid-feedback'>{errors.ccnum?.message}</div>}

                  {/* EXP MONTH */}
                  <label className="label-payment-class" htmlFor="expmonth">Exp Month</label>
                  <input className={`form-control ${errors.expmonth ? 'is-invalid' : ''} input-payment-class`} type="text" id="expmonth" name="expmonth" placeholder=""
                    {...register('expmonth', { required: 'Expiration month is required' })} />
                  {errors.expmonth && <div className='invalid-feedback'>{errors.expmonth?.message}</div>}

                  <div className="row-payment">
                    <div className="col-50">
                      {/* EXP YEAR */}
                      <label className="label-payment-class" htmlFor="expyear">Exp Year</label>
                      <input className={`form-control ${errors.expyear ? 'is-invalid' : ''} input-payment-class`} type="text" id="expyear" name="expyear" placeholder=""
                        {...register('expyear', { required: 'Expiration year is required' })} />
                      {errors.expyear && <div className='invalid-feedback'>{errors.expyear?.message}</div>}

                    </div>
                    <div className="col-50">
                      {/* CVV */}
                      <label className="label-payment-class" htmlFor="cvv">CVV</label>
                      <input className={`form-control ${errors.cvv ? 'is-invalid' : ''} input-payment-class`} type="text" id="cvv" name="cvv" placeholder=""
                        {...register('cvv', {
                          required: 'CVV is required',
                          minLength: { value: 3, message: "It has to be 3 numbers" },
                          maxLength: { value: 3, message: "It has to be 3 numbers" }
                        })} />
                      {errors.cvv && <div className='invalid-feedback'>{errors.cvv?.message}</div>}
                    </div>
                  </div>
                </div>

              </div>
              <input type="submit" value="Pay" className="btn-payment" />
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </div>
  )
}

export default UserPayment