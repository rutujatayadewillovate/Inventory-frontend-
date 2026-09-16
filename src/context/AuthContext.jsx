import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("electro_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("electro_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("electro_user");
    }
  }, [user]);

  // Login function
  const login = (userData) => {
    // userData example: { name: "Vikram Sharma", email: "admin@electro.com", role: "admin" }
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("electro_user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
