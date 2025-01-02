import React from "react";
import { Moon, Sun } from "lucide-react-native";
import { Fab, FabIcon } from "../ui/fab";
import { useTheme } from "../ui/theme-provider";

const MobileModeChangeButton = () => {
  const { colorMode, toggleColorMode } = useTheme();

  return (
    <Fab onPress={toggleColorMode} className="md:hidden bottom-4 right-4">
      <FabIcon
        as={colorMode === "light" ? Moon : Sun}
        className="fill-typography-50"
        size={"md"}
      />
    </Fab>
  );
};

export default MobileModeChangeButton;
