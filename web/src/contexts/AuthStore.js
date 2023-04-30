import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

function AuthStore({ children }) {
const [user, setUser] = useState();
const navigate = useNavigate();

  const handleUserChange = (user) => {
    console.log('User from AuthStore', user)
    setUser(user);
  }

  const logout = () => {
    handleUserChange();
    //localStorage.clear();
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, onUserChange: handleUserChange, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthStore as default, AuthContext }