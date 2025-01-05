import React, { useContext } from "react";
import { View, ViewStyle } from "react-native";
import { ThemeContext } from "@/components/ui/theme-provider";

interface ThemedViewProps {
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
}

const ThemedView: React.FC<ThemedViewProps> = ({ style, children }) => {
  const { colorMode } = useContext(ThemeContext);
  const backgroundColor = colorMode === "light" ? "#FFFFFF" : "#171717";

  return <View style={[{ flex: 1, backgroundColor }, style]}>{children}</View>;
};

export default ThemedView;
