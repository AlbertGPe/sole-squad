import React, { useEffect, useState } from 'react'
import userService from '../../../services/users'
import { useParams } from 'react-router-dom'
import MyLoader from '../../Loader/Loader'
import './UserProfile.css'

function UserProfile() {
  const { id } = useParams()
  const [user, setUser] = useState()

  useEffect(() => {
    async function fetchUsers(){
      try {
        const userDetail = await userService.detail(id);
        setUser(userDetail);
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers();
  }, [id])

   console.log(user)
  return (
    <>
      {!user ? (<MyLoader />) : (
        <div className='user-profile'>
          <div className='user-container'>
            <div className="picture">
              <img className="img-fluid" src={user.image} alt={user.username} />
            </div>
            <div className='mt-3'>
              <strong><p style={{fontSize:'30px'}}>{user.username}</p></strong>
              <i><p>{user.description}</p></i>
            </div>
            <div>
              {user.sneakers.map((sneaker)=> <img className="img-fluid" src={sneaker.images} alt='' />)}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserProfile