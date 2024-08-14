"use client";
import { factory } from "@/services/api/models";
import { useContext, useState, createContext } from "react";

const AuthContext = createContext({
  user: undefined,
  logout: () => {},
  initialized: false,
});

const defaultUser = factory.user({
  id: 1,
  name: "test",
  email: "test@example.com",
});

const AuthContainer = ({ children }) => {
  const [user, _] = useState(defaultUser);

  const logout = async () => {
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { user, logout } = useContext(AuthContext);

  return { user, logout };
};

export default AuthContainer;
