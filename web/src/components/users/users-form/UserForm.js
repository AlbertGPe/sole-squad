import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import usersService from '../../../services/users'
import { useNavigate } from 'react-router-dom';

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
        setServerError(error.message) //TODO -> Make a NAVIGATE TO ERROR PAGE
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onUserSubmit)}>
    {serverError && <div className='alert alert-danger d-none d-lg-block'>{serverError}</div>} {/* DELETE WHEN CHANGING SETSERVERERROR() WITH NAVIGATE */}

    {/* USERNAME */ } 
    
    <div className="m-3">
      <label htmlFor="username" className="form-label">Username</label>
      <input 
        type="text" 
        className={`form-control ${errors.username ? 'is-invalid' : ''}`} 
        placeholder="Username" {...register('username', {
          required: 'User name is required, are you trying to be anonymous?', 
          minLength: { value: 3, message: "Name needs at least 3 chars, are you a rapper or...?"}
        })} />
        {errors.username && <div className='invalid-feedback'>{errors.username?.message}</div>}
    </div>

    {/* EMAIL */ } 
    
    <div className="m-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input 
        type="email" 
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
    
    <div className="m-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input 
        type="password" 
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
    
    <div className='d-grid m-3'>
      <button type='submit' className='btn btn-primary'>Register</button>
    </div>
    </form>
  )
}

export default UserForm