import "intl";
import "intl/locale-data/jsonp/pt-BR";
import "react-native-gesture-handler";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "styled-components";
import defaultTheme from "./src/global/styles/theme";
import { AuthProvider } from "./src/hooks/useAuth";
import { Routes } from "./src/routes";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadingFonts() {
      await SplashScreen.preventAutoHideAsync();

      await Font.loadAsync({
        Poppins_400Regular: require("./assets/fonts/Poppins-Regular.ttf"),
        Poppins_500Medium: require("./assets/fonts/Poppins-Regular.ttf"),
        Poppins_700Bold: require("./assets/fonts/Poppins-Regular.ttf"),
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={defaultTheme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>

        <StatusBar style="light" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
