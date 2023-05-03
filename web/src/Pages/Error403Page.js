import React from 'react'
import gif from '../Images/404gif.gif'

function Error403Page() {
  return (
    <div className='text-center' style={{minHeight: '50rem'}}>
      <h1 className='mt-5'>Whooops!</h1>
      <h3 className='mt-3'>403 Forbidden</h3>
      <img src={gif} alt="" className='mt-3' width={'900px'}/>
      <h2 className='mt-5'>You can't acces here!</h2>
    </div>
  )
}

export default Error403Page