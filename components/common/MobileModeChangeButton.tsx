import React, { useContext } from "react";
import { Moon, Sun } from "lucide-react-native";
import { Fab, FabIcon } from "../ui/fab";
import { ThemeContext } from "../ui/theme-provider";

const MobileModeChangeButton = () => {
  const { colorMode, toggleColorMode } = useContext(ThemeContext);

  return (
    <Fab onPress={toggleColorMode} className="md:hidden bottom-16 right-4">
      <FabIcon
        as={colorMode === "light" ? Moon : Sun}
        className="fill-typography-50"
        size={"md"}
      />
    </Fab>
  );
};

export default MobileModeChangeButton;
