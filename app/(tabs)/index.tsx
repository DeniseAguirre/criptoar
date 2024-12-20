import CardItem from "@/components/top/CardItem";
import { ICoinData } from "@/models/ICoin";
import React from "react";
import { ScrollView } from "react-native";
import { Screen } from "@/components/common/Screen";
import { Text, View } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";

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

export default function TabOneScreen() {
  const [coins, setCoins] = React.useState<ICoinData[]>([]);

  React.useEffect(() => {
    async function getCoins() {
      const fetchedCoins = await fetchCoins();
      setCoins(fetchedCoins);
    }
    getCoins();
  }, []);

  return (
    <Screen safeArea={true}>
      <View className="flex flex-row items-center p-2">
        <FontAwesome name={"bitcoin"} size={24} color="white" />

        <Text className="text-2xl font-medium p-4 text-[--color-rgb]">
          Top 10 Criptomonedas
        </Text>
      </View>

      <ScrollView>
        {coins.map((coin) => (
          <CardItem key={coin.id} coin={coin} />
        ))}
      </ScrollView>
    </Screen>
  );
}
