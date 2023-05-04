import React, { useContext, useEffect, useState } from 'react'
import sneakersService from '../../../services/sneakers'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../../contexts/AuthStore';
import { useNavigate } from 'react-router-dom';

function AddSneaker() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm({ mode: 'onBlur' });
  const { user } = useContext(AuthContext);
  const [serverError, setServerError] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/403')
    }
  }, [])

  const handleSubmitSneaker = async (sneaker) => {
    try {
      console.log('here')
      sneaker = await sneakersService.create(sneaker)
    } catch (error) {
      const errors = error.response?.data?.errors 
      if (errors) {
        Object.keys(errors)
          .forEach((errorName) => setError(errorName, { message: errors[errorName] }))
      } else {
        setServerError(error.message) //TODO error page 500
      }
    }
  }

  return (
    <div className='edit-container'>
      <form onSubmit={handleSubmit(handleSubmitSneaker)}>
        <div className="form-group mb-3">
          <label htmlFor="images" className='mb-2'>Sneaker Image</label>
          <div className="">
            <input type="file" id="images" name="images"/>
          </div>
        </div>

        {/* NAME  */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            placeholder="Sneaker Name"
            {...register('name', { required: 'Name is required'})}
            />
            {errors.name && <div className='invalid-feedback'>{errors.name?.message}</div>}
        </div>

        {/* BRAND  */}
        <div className="form-group">
          <label htmlFor="brand">brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            className={`form-control ${errors.brand ? 'is-invalid' : ''}`}
            placeholder='Brand name'
            {...register('brand', { required: 'Brand is required'})}
          />
          {errors.brand && <div className='invalid-feedback'>{errors.brand?.message}</div>}
        </div>

        {/* GENDER  */}
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select name='gender' id='gender' className='form-control'>
            <option value="unisex" selected="selected">Unisex</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>

        {/* PRICE  */}
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            placeholder='Sneaker Price'
            {...register('price', { required: 'Price is required'})}
          />
          {errors.price && <div className='invalid-feedback'>{errors.price?.message}</div>}
        </div>

        {/* SIZE  */}
        <div className="form-group">
          <label htmlFor="price">Size</label>
          <input
            type="number"
            id="size"
            name="size"
            className={`form-control ${errors.size ? 'is-invalid' : ''}`}
            placeholder='Sneaker Size'
            {...register('size', { required: 'Size is required'})}
          />
          {errors.size && <div className='invalid-feedback'>{errors.size?.message}</div>}
        </div>

        {/* DESCRIPTION  */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            placeholder='Sneaker description'
            {...register('description', { required: 'Description is required'})}
          />
          {errors.description && <div className='invalid-feedback'>{errors.description?.message}</div>}
        </div>

        {/* BOX CONDITION  */}
        <div className="form-group">
          <label htmlFor="boxCondition">Box Condition</label>
          <input
            type="text"
            id="boxCondition"
            name="boxCondition"
            className='form-control'
            placeholder='Box condition (no box = empty)'
          />
        </div>

        <button type="submit" className='btn btn--form'>Create Sneaker</button>
      </form>
    </div>
  )
}

export default AddSneaker