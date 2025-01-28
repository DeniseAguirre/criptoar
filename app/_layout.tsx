import "../global.css";
import React, { useEffect, useState } from "react";
import * as Linking from "expo-linking";
import { SafeAreaView, useColorScheme } from "react-native";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { ThemeContext } from "@/components/ui/theme-provider";
import "react-native-gesture-handler";
import MobileModeChangeButton from "@/components/common/MobileModeChangeButton";
import MyTabs from "@/navigation/TabBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

let defaultTheme: "dark" | "light" = "light";

Linking.getInitialURL().then((url: any) => {
  let { queryParams } = Linking.parse(url) as any;
  defaultTheme = queryParams?.iframeMode ?? defaultTheme;
});

export default function App() {
  const deviceColorScheme = useColorScheme();
  const [userPreference, setUserPreference] = useState<"light" | "dark" | null>(
    null
  );

  // Log para debug
  console.log("Device color scheme:", deviceColorScheme);

  const [colorMode, setColorMode] = useState<"light" | "dark">(
    deviceColorScheme === "dark" ? "dark" : "light"
  );

  // Log para debug
  useEffect(() => {
    console.log("Current color mode:", colorMode);
    console.log("User preference:", userPreference);
  }, [colorMode, userPreference]);

  // Cargar preferencia guardada al inicio
  useEffect(() => {
    AsyncStorage.getItem("colorMode")
      .then((savedMode) => {
        console.log("Saved mode from storage:", savedMode); // Log para debug
        if (savedMode === "light" || savedMode === "dark") {
          setUserPreference(savedMode);
          setColorMode(savedMode);
        }
      })
      .catch((error) => console.error("Error loading color mode:", error));
  }, []);

  // Seguir el modo del dispositivo si no hay preferencia guardada
  useEffect(() => {
    if (!userPreference && deviceColorScheme) {
      console.log("Setting device color scheme:", deviceColorScheme); // Log para debug
      setColorMode(deviceColorScheme);
    }
  }, [deviceColorScheme, userPreference]);

  const toggleColorMode = React.useCallback(async () => {
    const newMode = colorMode === "light" ? "dark" : "light";
    setColorMode(newMode);
    setUserPreference(newMode);
    try {
      await AsyncStorage.setItem("colorMode", newMode);
    } catch (error) {
      console.error("Error saving color mode:", error);
    }
  }, [colorMode]);

  const contextValue = React.useMemo(
    () => ({ colorMode, toggleColorMode }),
    [colorMode, toggleColorMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <GluestackUIProvider mode={colorMode}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colorMode === "light" ? "#FFFFFF" : "#171717",
          }}
        >
          <MobileModeChangeButton />
          <MyTabs />
        </SafeAreaView>
      </GluestackUIProvider>
    </ThemeContext.Provider>
  );
}
