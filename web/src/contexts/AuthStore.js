import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

function AuthStore({ children }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('current-user');
    if (user) {
      handleUserChange(JSON.parse(user))
    }
  },[])

  const handleUserChange = (user) => {
    console.log('User from AuthStore', user)
    if (!user) {
      localStorage.removeItem('current-user');
      localStorage.removeItem('user-access-token');
    } else {
      localStorage.setItem('user-access-token', user.token);
      localStorage.setItem('current-user', JSON.stringify(user));
    }
    setUser(user);
  }

  const logout = () => {
    handleUserChange();
    localStorage.removeItem('clientCart');
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, onUserChange: handleUserChange, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthStore as default, AuthContext }