import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/useAuth";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { userInfo, isLoadingUser } = useAuth();

  return (
    <NavigationContainer>
      {userInfo.id ? <AppRoutes /> : !isLoadingUser ? <AuthRoutes /> : null}
    </NavigationContainer>
  );
}
