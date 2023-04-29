import React, { useEffect, useState } from 'react'
import userService from '../../../services/users'
import { useParams } from 'react-router-dom'

function UserProfile() {
  const { id } = useParams()
  const [user, setUser] = useState()

  useEffect(() => {
    async function fetchUsers(){
      try {
        const user = await userService.detail(id);
        setUser(user);
        console.log(user)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers();
  }, [id])

  return (
    <>
      <h1>User</h1>
    </>
  )
}

export default UserProfile