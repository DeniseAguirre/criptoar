import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "react-native-reanimated";
import "../styles/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SafeAreaView } from "react-native";
import HomestayPage from "@/components/home/HomestayPage";
import { ThemeContext, ThemeProvider } from "@/components/ui/theme-provider";

export {
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider>
      <RootContent />
    </ThemeProvider>
  );
}

function RootContent() {
  const { colorMode } = React.useContext(ThemeContext);
  
  return (
    <>
      <SafeAreaView
        className={`${colorMode === "light" ? "bg-[#E5E5E5]" : "bg-[#262626]"}`}
      />
      <GluestackUIProvider mode={colorMode}>
        <SafeAreaView
          className={`${
            colorMode === "light" ? "bg-white" : "bg-[#171717]"
          } flex-1 overflow-hidden`}
        >
          <HomestayPage />
        </SafeAreaView>
      </GluestackUIProvider>
    </>
  );
}

