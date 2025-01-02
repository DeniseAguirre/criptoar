import "../global.css";
import React from "react";
import * as Linking from "expo-linking";
import { SafeAreaView } from "react-native";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import HomestayPage from "@/components/home/HomestayPage";
import { ThemeContext } from "@/components/ui/theme-provider";

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

  return (
    <>
      <SafeAreaView
        className={`${colorMode === "light" ? "bg-[#E5E5E5]" : "bg-[#262626]"}`}
      />
      <ThemeContext.Provider value={contextValue}>
        <GluestackUIProvider mode={colorMode}>
          <SafeAreaView
            className={`${
              colorMode === "light" ? "bg-white" : "bg-[#171717]"
            } flex-1 overflow-hidden`}
          >
            <HomestayPage />
          </SafeAreaView>
        </GluestackUIProvider>
      </ThemeContext.Provider>
    </>
  );
}
