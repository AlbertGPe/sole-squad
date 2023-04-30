import React from 'react'
import { Link } from 'react-router-dom'
import './UsersItem.css'

function UsersItem({ user }) {
  return (
    <Link to={`/users/${user.id}`} style={{textDecoration: 'none', color: 'black'}}>
      <div className="our-team">
        <div className="picture">
          <img className="img-fluid" src={user.image} alt={user.username} />
        </div>
        <div className="team-content">
          <h3 className="name">{user.username}</h3>
          <h4 className="title">{user.description}</h4>
        </div>
      </div>
    </Link>
  )
}

export default UsersItem