import React, { createContext, useContext, useState } from "react";

interface IUser {
  id: string;
  name: string;
  email: string;
  profileImage: string;
}

interface AuthContextProps {
  userInfo: IUser;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [userInfo, setUserInfo] = useState({} as IUser);

  return (
    <AuthContext.Provider value={{ userInfo }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used inside a AuthContext");

  return context;
};
