import React, { useContext } from "react";

import { HStack } from "../ui/hstack";
import { Pressable } from "../ui/pressable";
import { VStack } from "../ui/vstack";
import { Icon } from "../ui/icon";
import { Text } from "../ui/text";
import { ThemeContext } from "../ui/theme-provider";

const MobileBottomTabs = ({ bottomTabs, activeTab, setActiveTab }: any) => {
  const { colorMode } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [actionsheetVisible, setActionsheetVisible] = React.useState(false);

  return (
    <HStack
      className="content-center absolute bottom-0 justify-between w-full py-3 px-6 md:hidden"
      style={{
        backgroundColor: colorMode === "light" ? "white" : "#171717",
      }}
    >
      {bottomTabs.map((tab: any) => {
        return (
          <Pressable
            key={tab.label}
            onPress={() => {
              if (tab.label !== "Listing" && tab.label !== "Filter") {
                setActiveTab(tab.label);
              }
              if (tab.label === "Listing") {
                setModalVisible(true);
              }
              if (tab.label === "Filter") {
                setActionsheetVisible(true);
              }
            }}
            disabled={tab.disabled}
            //@ts-ignore
            opacity={tab.disabled ? 0.5 : 1}
          >
            <VStack className="items-center">
              <Icon
                as={tab.icon}
                size={"lg"}
                className={`${
                  activeTab === tab.label
                    ? "text-typography-900"
                    : "text-typography-400"
                }`}
              />
              <Text
                size="xs"
                className={`${
                  activeTab === tab.label
                    ? "text-typography-900"
                    : "text-typography-400"
                }`}
              >
                {tab.label}
              </Text>
            </VStack>
          </Pressable>
        );
      })}
    </HStack>
  );
};

export default MobileBottomTabs;
