import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import usersService from '../../../services/users'
import { AuthContext } from '../../../contexts/AuthStore'
import './UserEditProfile.css'

function UserEditProfile() {
  const { handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
  const { id } = useParams();
  const { user, onUserChange } = useContext(AuthContext)
  const navigate = useNavigate()
  const [userObj, setUserObj] = useState(user)

  useEffect(() => {
    if (!user) {
      navigate('/403')
    }
  }, [])

  const onUpdateSubmit = async () => {
    try{
      const formData = new FormData();
      if (userObj.image) formData.append('image', userObj.image[0])
      if (userObj.description) formData.append('description', userObj.description);
      if (userObj.instagramUrl) formData.append('instagramUrl', userObj.instagramUrl);
      const user = await usersService.update(formData, id);
      onUserChange({...userObj, user})
      navigate(`/users/${id}`)     
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (ev) => {
    if (ev.target.files) {
      setUserObj({...userObj, [ev.target.id] : ev.target.files})
    } else {
      setUserObj({...userObj, [ev.target.id] : ev.target.value})
    }
  }

  return (
    <div className='edit-container'>
      <form onSubmit={handleSubmit(onUpdateSubmit)}>
        <div className="form-group mb-3">
            <label htmlFor="image" className='mb-2'>Profile image</label>
            <div className="">
                <input type="file" id="image" name="image" onChange={handleChange}/>
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="description">Description</label>
            <input 
              type="text" 
              className='form-control'
              id="description" 
              name="description"
              placeholder="Your description" 
              onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="url">Instagram</label>
            <input 
              type="url" 
              id="instagramUrl"
              name="instagramUrl"
              className={`form-control ${errors.instagramUrl ? 'is-invalid' : ''}`} 
              placeholder='Your instagram URL' 
              onChange={handleChange}
              />
              {errors.instagramUrl && <div className='invalid-feedback'>{errors.instagramUrl?.message}</div>}
          </div>       
      <button type="submit" value="update" className="btn btn--form">Submit</button>
    </form>
  </div>
  )
}

export default UserEditProfile