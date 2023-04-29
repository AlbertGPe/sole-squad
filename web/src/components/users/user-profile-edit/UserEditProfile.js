import React from 'react'
import { useForm } from 'react-hook-form'

function UserEditProfile() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm({ mode: 'onBlur' });



  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
          <label htmlFor="image" className='mb-2'>Profile image</label>
          <div className="">
              <input type="file" id="image" name="image"/>
          </div>
      </div>
      <div className="form-group">
          <label htmlFor="description">Description</label>
          <input 
            type="text" 
            className='form-control'
            id="username" 
            placeholder="Your description" />
        </div>
        <div className="form-group">
          <label htmlFor="url">Instagram</label>
          <input 
            type="url" 
            id="instagramUrl"
            className={`form-control ${errors.instagramUrl ? 'is-invalid' : ''}`} 
            placeholder='Your instagram URL' {...register('instagramUrl', {
              pattern: {
                value: /^https?:\/\/instagram\.com\/[a-z0-9]+$/,
                message: 'Instagram URL must be valid'
              }
            })}/>
            {errors.instagramUrl && <div className='invalid-feedback'>{errors.instagramUrl?.message}</div>}
        </div>       
    <button type="submit" className="btn btn--form">Submit</button>
  </form>
  )
}

export default UserEditProfile