"use client";
import api, { getAccessToken, getUserId } from "@/services/api";
import { factory } from "@/services/api/models";
import { User } from "@/services/api/models/user";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState, createContext } from "react";
import route from "@/lib/route";
import { AxiosError } from "axios";

interface IAuthContext {
  user?: User;
  logout: () => void;
  initialized: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: undefined,
  logout: () => {},
  initialized: false,
});

interface Props {
  children: React.ReactNode;
  isPublic?: boolean;
}

const AuthContainer = ({ children, isPublic }: Props) => {
  const logout = async () => {
  };

  return (
    <AuthContext.Provider value={{ user, logout, initialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { user, logout } = useContext(AuthContext);

  return { user, logout };
};

export default AuthContainer;
