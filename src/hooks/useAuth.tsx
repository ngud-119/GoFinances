import { startAsync } from "expo-auth-session";
import React, { createContext, useContext, useState } from "react";
import { OAuthProvider } from "../components/SignInSocialButton";

const { GOOGLE_CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface IUser {
  id: string;
  name: string;
  email: string;
  profileImage: string;
}

interface AuthContextProps {
  userInfo: IUser;
  signIn: (provider: OAuthProvider) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [userInfo, setUserInfo] = useState({} as IUser);

  async function signIn(provider: OAuthProvider) {
    switch (provider) {
      case "google":
        await signInWithGoogle();
        break;
      default:
        break;
    }
  }

  async function signInWithGoogle() {
    const BASE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
    const RESPONSE_TYPE = "token";
    const SCOPE = encodeURI("profile email");

    const authUrl = `${BASE_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&prompt=select_account`;

    const response = await startAsync({ authUrl });

    if (response.type === "success") {
      const { access_token } = response.params;

      const responseUserInfo = await fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
      );
      const userInfoData = await responseUserInfo.json();

      setUserInfo({
        id: userInfoData.id,
        name: userInfoData.name,
        email: userInfoData.email,
        profileImage: userInfoData.picture,
      });
    }
  }

  async function signOut() {
    setUserInfo({} as IUser);
  }

  return (
    <AuthContext.Provider value={{ userInfo, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used inside a AuthContext");

  return context;
};
