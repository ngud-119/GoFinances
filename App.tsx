import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import defaultTheme from "./src/global/styles/theme";
import { AppRoutes } from "./src/routes/app.routes";
import { CategorySelect } from "./src/screens/CategorySelect";
import { Dashboard } from "./src/screens/Dashboard";
import { Register } from "./src/screens/Register";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadingFonts() {
      await SplashScreen.preventAutoHideAsync();

      await Font.loadAsync({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold,
      });

      await SplashScreen.hideAsync();
      setIsReady(true);
    }

    loadingFonts();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>

      <StatusBar style="light" />
    </ThemeProvider>
  );
}
