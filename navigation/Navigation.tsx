import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeContext } from "@/components/ui/theme-provider";
import { routes } from "@/navigation/routes";

const Stack = createStackNavigator();

const Navigation = () => {
  const { colorMode } = useContext(ThemeContext);
  const headerBackgroundColor = colorMode === "light" ? "#FFFFFF" : "#171717";
  const headerTintColor = colorMode === "light" ? "#000000" : "#FFFFFF";

  return (
    <Stack.Navigator>
      {routes.map(({ name, component, options }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={({ route }) => ({
            ...(typeof options === "function" ? options(route) : options),
            headerStyle: {
              backgroundColor: headerBackgroundColor,
              height: 56, // Altura personalizada
            },
            headerStatusBarHeight: 0,
            headerTitleStyle: {
              fontSize: 16,
              textAlign: "center",
            },
            headerTitleAlign: "center",
            headerTintColor,
          })}
        />
      ))}
    </Stack.Navigator>
  );
};

export default Navigation;
