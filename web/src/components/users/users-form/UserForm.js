import React from 'react'
import { useForm } from 'react-hook-form';

function UserForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });

  const onUserSubmit = (user) => {
    console.log(user);
  }

  return (
    <form onSubmit={handleSubmit(onUserSubmit)}>
      <div className="input-group my-3">
        <span className="input-group-text" id="basic-addon1">@</span>
        <input 
          type="text" 
          className={`form-control ${errors.username ? 'is-invalid' : ''}`} 
          placeholder="Username" {...register('username', {
            required: 'User name is required', 
            minLength: { value: 3, message: "Name needs at least 3 chars"}
          })} />
          {errors.username && <div className='invalid-feedback'>{errors.username?.message}</div>}
      </div>
      <div className='d-grid'>
        <button type='submit' className='btn btn-primary'>Register</button>
      </div>
    </form>
  )
}

export default UserForm