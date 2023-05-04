import React, { useContext, useEffect, useState } from 'react'
import userService from '../../../services/users'
import { Link, useNavigate, useParams } from 'react-router-dom'
import MyLoader from '../../Loader/Loader'
import { AuthContext } from '../../../contexts/AuthStore';
import './UserProfile.css'

function UserProfile() {
  const { id } = useParams()
  const [userProfile, setUserProfile] = useState()
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate();

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

  const handleDelete = () => {
    userService.remove(id);
    logout()
    navigate('/login');
  }

  return (
    <>
      {!userProfile ? (<MyLoader />) : (
        <div className='user-profile'>
          <div className='user-container'>
            <div className="picture">
              <img className="img-fluid" src={userProfile.image} alt={userProfile.username} />
              {user?.id === id && <Link to='/sneakers/add'><button className='btn btn--form ms-4'>Add Sneaker</button></Link>}
              {user?.id === id && <button className='btn btn-danger ms-4' onClick={handleDelete}>Delete Account</button>}
            </div>
            <div className='mt-3'>
              <strong><p style={{fontSize:'30px'}}>{userProfile.username}</p></strong>
              <i><p>{userProfile.description}</p></i>
              {userProfile.sneakers.length !== 0 ? (
                <h4 className='border-top pt-3 mb-3'><strong>Selling Sneakers</strong></h4>
              ) : (
                <h4 className='border-top pt-3 mb-3'><strong>No sneakers on sale yet!</strong></h4>
              )}
            </div>
            <div className='profile-sneakers-images'>
              {userProfile.sneakers?.map((sneaker, i)=> <Link to={`/sneakers/${sneaker.id}`} key={i}><img  className="m-2" src={sneaker.images} alt='' width={'250px'}/></Link>)}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserProfile