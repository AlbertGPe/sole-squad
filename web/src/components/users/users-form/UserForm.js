import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import usersService from '../../../services/users'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../Images/sole-squad-logo-white.png'
import './UserForm.css'

function UserForm() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm({ mode: 'onBlur' });
  const [serverError, setServerError] = useState(undefined)
  const navigate = useNavigate();

  const onUserSubmit = async (user) => {
    try {
      user = await usersService.create(user);
      navigate('/login', { state: { user } });
    } catch (error) {
      const errors = error.response?.data?.errors
      if (errors) {
        Object.keys(errors)
          .forEach((errorName) => setError(errorName, { message: errors[errorName] }))
      } else {
        setServerError(error.message) //TODO -> Make a NAVIGATE TO ERROR PAGE 500
      }
    }
  }

  return (
    <div className="signup__container">
      <div className="container__child signup__thumbnail">
        <div className="thumbnail__content text-center">
          <h1 className="heading--primary">Welcome to <img src={logo} alt="SoleSquadLogo" /></h1>
          <h2 className="heading--secondary">Are you ready to join the elite?</h2>
        </div>
        <div className="signup__overlay"></div>
      </div>
      <div className="container__child signup__form">
        <form onSubmit={handleSubmit(onUserSubmit)}>
        {serverError && <div className='alert alert-danger d-none d-lg-block'>{serverError}</div>} {/* DELETE WHEN CHANGING SETSERVERERROR() WITH NAVIGATE */}

          {/* USERNAME */ } 

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              id="username" 
              placeholder="Username" {...register('username', {
                required: 'User name is required, are you trying to be anonymous?', 
                minLength: { value: 3, message: "Name needs at least 3 chars, are you a rapper or...?"}
              })} />
              {errors.username && <div className='invalid-feedback'>{errors.username?.message}</div>}
          </div>

          {/* EMAIL */ } 


          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
              placeholder='SoleSquad@solesquad.com' {...register('email', {
                required: 'User email is required...I mean...everyone has an email nowadays',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'User email must be valid, look for the tinny details'
                }
              })}/>
              {errors.email && <div className='invalid-feedback'>{errors.email?.message}</div>}
          </div>

          {/* PASSWORD */ } 

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password"
              id="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
              placeholder='********' {...register('password', {
                required: 'User password is required unless you want it to be public, hope not',
                minLength: {
                  value: 8,
                  message: "User password needs at least 8 chars... just try not to be so obvious"
                }
              })}/>
              {errors.password && <div className='invalid-feedback'>{errors.password?.message}</div>}
          </div>
          <div className="m-t-lg">
            <ul className="list-inline">
              <li>
                <input className="btn btn--form" type="submit" value="Register" />
              </li>
              <li>
                <Link to='/login' className='signup__link'>I am already a member</Link>
              </li>
            </ul>
          </div>
        </form>  
      </div>
    </div>
  )
}

export default UserForm