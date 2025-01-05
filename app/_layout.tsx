import "../global.css";
import React from "react";
import * as Linking from "expo-linking";
import { SafeAreaView } from "react-native";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { ThemeContext } from "@/components/ui/theme-provider";
import "react-native-gesture-handler";
import Navigation from "@/navigation/Navigation";

let defaultTheme: "dark" | "light" = "light";

Linking.getInitialURL().then((url: any) => {
  let { queryParams } = Linking.parse(url) as any;
  defaultTheme = queryParams?.iframeMode ?? defaultTheme;
});

export default function App() {
  const [colorMode, setColorMode] = React.useState<"dark" | "light">(
    defaultTheme
  );

  const toggleColorMode = React.useCallback(() => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const contextValue = React.useMemo(
    () => ({ colorMode, toggleColorMode }),
    [colorMode, toggleColorMode]
  );

  const backgroundColor = colorMode === "light" ? "#FFFFFF" : "#171717";

  return (
    <ThemeContext.Provider value={contextValue}>
      <GluestackUIProvider mode={colorMode}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor,
          }}
        >
          <Navigation />
        </SafeAreaView>
      </GluestackUIProvider>
    </ThemeContext.Provider>
  );
}
