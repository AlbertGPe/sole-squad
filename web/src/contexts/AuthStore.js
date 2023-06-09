import React, { createContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

function AuthStore({ children }) {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem('current-user');
    if (user) {
      return JSON.parse(user)
    }
  });
  const [cart, setCart] = useState();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const user = localStorage.getItem('current-user');
    if (user) {
      handleUserChange(JSON.parse(user))
    }
  },[])

  const handleUserChange = (user) => {
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

  const getLocalStorageCart = () => {
    setCart(JSON.parse(localStorage.getItem('clientCart')))
  }

  return (
    <AuthContext.Provider value={{ user, onUserChange: handleUserChange, logout, getLocalStorageCart, cart }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthStore as default, AuthContext }