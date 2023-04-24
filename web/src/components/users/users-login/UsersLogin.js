import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import usersService from '../../../services/users'
import { AuthContext } from '../../../contexts/AuthStore'
import { useLocation, useNavigate } from 'react-router-dom'

function UsersLogin() { 
  const location = useLocation();
  const { register, handleSubmit, setError,formState: { errors }} = useForm({ mode: 'onBlur', defaultValues: { username: location?.state?.user?.username} })
  const [serverError, setServerError] = useState(undefined)
  const { onUserChange } = useContext(AuthContext)
  const navigate = useNavigate();
 
    const onLoginSubmit = async (user) => {
      try {
        setServerError();
        user = await usersService.login(user);
        onUserChange(user);
        navigate('/');
      } catch (error) {
        const errors = error.response?.data?.errors;
        if (errors) {
          Object.keys(errors)
            .forEach(errorName => setError(errorName, { message: errors[errorName] }))
        } else {
          setServerError(error.message)
        }
      }
    }


  return (
    <>
      {location?.state?.user?.confirm === false && <div className='alert alert-info'>Please check your email and active your account before login!</div>}
      <form onSubmit={handleSubmit(onLoginSubmit)}>
        {serverError && <div className='alert alert-danger d-none d-lg-block'>{serverError}</div>}
        {/* USERNAME */}
        <div className='m-3'>
          <label htmlFor="username" className='form-label'>Username</label>
          <input 
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            placeholder='Username' {...register('username', {
              required: 'User name is required'
            })} />
            {errors.username && <div className='invalid-feedback'>{errors.username?.message}</div>}
        </div>

        {/* PASSWORD */}
        <div className='m-3'>
            <label htmlFor="password" className='form-label'>Password</label>
            <input 
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder='********' {...register('password', {
                required: 'User password is required'
              })} />
              {errors.password && <div className='invalid-feedback'>{errors.password?.message}</div>}
        </div>

        <div className='d-grid m-3'>
          <button type='submit' className='btn btn-primary'>Login</button>
        </div>
      </form>
    </>
  )
}

export default UsersLogin