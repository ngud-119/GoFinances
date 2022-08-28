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
  const [userInfo, setUserInfo] = useState({
    id: "123",
    name: "Walisson",
    email: "walissonsilva10@gmail.com",
    profileImage: "https://avatars.githubusercontent.com/u/13500056?v=4",
  } as IUser);

  return (
    <AuthContext.Provider value={{ userInfo }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used inside a AuthContext");

  return context;
};
