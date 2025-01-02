import { ICoinData } from "@/models/ICoin";
import React from "react";
import { ScrollView } from "react-native";
import { VStack } from "../ui/vstack";
import { Screen } from "../common/Screen";
import CryptoTable from "./CryptoTable";
import CardTitle from "./CardTitle";

async function fetchCoins(): Promise<ICoinData[]> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10"
    );
    const data: ICoinData[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching coins:", error);
    return [];
  }
}

export default function TopCrypto({
  isActive,
}: {
  readonly isActive: boolean;
}) {
  const [coins, setCoins] = React.useState<ICoinData[]>([]);

  React.useEffect(() => {
    async function getCoins() {
      const fetchedCoins = await fetchCoins();
      setCoins(fetchedCoins);
    }
    getCoins();
  }, []);

  return (
    <ScrollView style={{ display: isActive ? "flex" : "none" }}>
      <VStack className="px-5 py-4 flex-1" space="lg">
        <CardTitle />
        <Screen safeArea={true}>
          <CryptoTable coins={coins} />
        </Screen>
      </VStack>
    </ScrollView>
  );
}
