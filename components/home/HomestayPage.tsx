import React, { useEffect } from "react";
import { StatusBar, Platform } from "react-native";

import { Plus, Home, User, Search } from "lucide-react-native";

import { Box } from "../ui/box";
import MobileModeChangeButton from "../common/MobileModeChangeButton";
import MobileBottomTabs from "../common/MobileBottomTabs";
import TopCrypto from "../top/TopCrypto";

const bottomTabs = [
  {
    icon: Home,
    label: "Home",
  },
  {
    icon: Search,
    label: "Search",
  },
  {
    icon: Plus,
    label: "Listing",
  },
  {
    icon: User,
    label: "Profile",
    disabled: true,
  },
];

const HomestayPage = () => {
  useEffect(() => {
    if (Platform.OS === "web") {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    }
  }, []);

  const [activeTab, setActiveTab] = React.useState("Home");

  return (
    <>
      <Box className="flex-1">
        <StatusBar />

        <Box className="flex-1">
          <TopCrypto isActive={activeTab === "Home"} />

          <MobileModeChangeButton />
        </Box>
        {/* mobile bottom tabs */}
        <Box className="h-[72px] items-center w-full flex md:hidden border-t border-outline-50 mt-2">
          <MobileBottomTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            bottomTabs={bottomTabs}
          />
        </Box>
      </Box>
      {/* )} */}
    </>
  );
};
export default HomestayPage;
