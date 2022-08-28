import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { userInfo } = useAuth();

  return (
    <NavigationContainer>
      {userInfo.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
