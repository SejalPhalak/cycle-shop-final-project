import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(false);
//===================register===================
const register = async (name, email, password) => {
  setLoading(true);

  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    return response.data;
  } finally {
    setLoading(false);
  }
};
  // ================= LOGIN =================

  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const data = response.data;

      if (data.success) {
        // Save token
        localStorage.setItem("token", data.token);

        // Save user
        if (data.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );

          setUser(data.user);
        }

        // IMPORTANT
        // React state update
        setToken(data.token);
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  // ================= LOGOUT =================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ================= useAuth =================

export const useAuth = () => {
  return useContext(AuthContext);
};