import { ThemeContext } from "@/components/ui/theme-provider";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { routes } from "./routes";
import { View, Platform, StyleSheet } from "react-native";
import { useLinkBuilder } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { ListOrdered, Search, User } from "lucide-react-native";
import ThemedView from "@/components/common/ThemedView";

export const Tab = createBottomTabNavigator();

const bottomTabs = [
  { icon: ListOrdered, label: "Top", route: "Home", disabled: false },
  { icon: Search, label: "Search", route: "Search", disabled: false },
  { icon: User, label: "Profile", route: "Profile", disabled: true },
];

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

function MyTabBar({ state, descriptors, navigation }: Readonly<TabBarProps>) {
  const { buildHref } = useLinkBuilder();

  return (
    <View style={styles.tabBar}>
      {bottomTabs.map(
        ({ icon: IconComponent, label, route, disabled }, index) => {
          const isFocused = state.index === index;
          const onPress = () => {
            if (disabled) return;
            const event = navigation.emit({
              type: "tabPress",
              target: state.routes[index].key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route);
            }
          };

          const onLongPress = () => {
            if (!disabled) {
              navigation.emit({
                type: "tabLongPress",
                target: state.routes[index].key,
              });
            }
          };

          return (
            <ThemedView key={route}>
              <PlatformPressable
                key={route}
                href={buildHref(route)}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={label}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[styles.tabItem, disabled && styles.disabledTab]}
              >
                <IconComponent
                  size={24}
                  color={isFocused ? "#007AFF" : "#8E8E93"}
                  style={disabled ? { opacity: 0.5 } : {}}
                />
                <Text
                  style={[styles.tabLabel, isFocused && styles.focusedLabel]}
                >
                  {label}
                </Text>
              </PlatformPressable>
            </ThemedView>
          );
        }
      )}
    </View>
  );
}

export default function MyTabs() {
  const { colorMode } = useContext(ThemeContext);
  const headerBackgroundColor = colorMode === "light" ? "#FFFFFF" : "#171717";
  const headerTintColor = colorMode === "light" ? "#000000" : "#FFFFFF";

  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      {routes.map(({ name, component, options }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={({ route }) => ({
            ...(typeof options === "function" ? options(route) : options),
            headerStyle: {
              backgroundColor: headerBackgroundColor,
            },
            headerStatusBarHeight: Platform.OS === "android" ? 26 : 1,
            headerTitleStyle: {
              fontSize: 16,
              textAlign: "center",
            },
            headerTitleAlign: "center",
            headerTintColor,
          })}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: 60,
    backgroundColor: Platform.OS === "android" ? "#F5F5F5" : "#FFFFFF",
    display: "none",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 12,
    color: "#8E8E93",
  },
  focusedLabel: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  disabledTab: {
    opacity: 0.5,
  },
});
