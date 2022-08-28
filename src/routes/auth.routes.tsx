import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SignIn } from "../screens/SignIn";

export function AuthRoutes() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={SignIn} />
    </Navigator>
  );
}
