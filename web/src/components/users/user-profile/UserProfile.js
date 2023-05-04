import React, { useContext, useEffect, useState } from 'react'
import userService from '../../../services/users'
import { Link, useParams } from 'react-router-dom'
import MyLoader from '../../Loader/Loader'
import { AuthContext } from '../../../contexts/AuthStore';
import './UserProfile.css'

function UserProfile() {
  const { id } = useParams()
  const [userProfile, setUserProfile] = useState()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    async function fetchUsers(){
      try {
        const userDetail = await userService.detail(id);
        setUserProfile(userDetail);
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers();
  }, [id])

  return (
    <>
      {!userProfile ? (<MyLoader />) : (
        <div className='user-profile'>
          <div className='user-container'>
            <div className="picture">
              <img className="img-fluid" src={userProfile.image} alt={userProfile.username} />
              {user?.id === id && <Link to='/sneakers/add'><button className='btn btn--form ms-4'>Add Sneaker</button></Link>}
            </div>
            <div className='mt-3'>
              <strong><p style={{fontSize:'30px'}}>{userProfile.username}</p></strong>
              <i><p>{userProfile.description}</p></i>
            </div>
            <div>
              {userProfile.sneakers.map((sneaker)=> <Link to={`/sneakers/${sneaker.id}`}><img key={sneaker.id} className="img-fluid m-2" src={sneaker.images} alt='' /></Link>)}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserProfile