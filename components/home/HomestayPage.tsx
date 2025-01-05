import React, { useEffect } from "react";
import { StatusBar, Platform } from "react-native";

import { Plus, User, Search, ListOrdered } from "lucide-react-native";

import { Box } from "../ui/box";
import MobileModeChangeButton from "../common/MobileModeChangeButton";
import MobileBottomTabs from "../common/MobileBottomTabs";
import TopCrypto from "../top/TopCrypto";

import ThemedView from "../common/ThemedView";

const bottomTabs = [
  {
    icon: ListOrdered,
    label: "Top",
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

  const [activeTab, setActiveTab] = React.useState("Top");

  return (
    <ThemedView>
      <StatusBar />

      <Box className="flex-1">
        <TopCrypto isActive={activeTab === "Top"} />

        <MobileModeChangeButton />
      </Box>
      {/* mobile bottom tabs */}
      <Box className="h-[50px] items-center w-full flex md:hidden border-t border-outline-50 mt-2">
        <MobileBottomTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          bottomTabs={bottomTabs}
        />
      </Box>

      {/* )} */}
    </ThemedView>
  );
};
export default HomestayPage;
