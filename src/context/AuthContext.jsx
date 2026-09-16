import React, { createContext, useState, useEffect } from 'react';
import { login as loginApi } from '../api/authApi';

export const AuthContext = createContext(null);

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = parseJwt(token);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || 'staff';
        setUser({ token, role, ...decoded });
      } else {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginApi(email, password);
    if (data.token) {
      localStorage.setItem('token', data.token);
      const decoded = parseJwt(data.token);
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || 'staff';
      setUser({ token: data.token, role, ...decoded });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>; // Simple loading state
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
