import React, { useEffect, useState } from 'react'
import userService from '../../../services/users'
import MyLoader from '../../Loader/Loader';
import UsersItem from '../users-item/UsersItem';

function UsersList() {
  const [users, setUsers] = useState();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const userList = await userService.list()
        setUsers(userList)
        
      } catch (error) { 
        console.error(error);
      }
    }
    fetchUsers()
  }, [])

  return (
    <>
      {!users ? (<MyLoader />) : (
        <div className='body-users'>
          {users.map((user) => <div key={user.id}><UsersItem user={user}/></div>)}
        </div>
      )}
    </>
  )
}

export default UsersList