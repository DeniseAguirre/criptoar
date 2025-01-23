import React from "react";
import { ScrollView } from "react-native";
import { VStack } from "../ui/vstack";
import { Screen } from "../common/Screen";
import CardTitle from "./CardTitle";
import ThemedView from "../common/ThemedView";
import { Spinner } from "../ui";
import { useTopCoins } from "@/hooks/useTopCoins";
import TopMarketTable from "./TopMarketTable";

export default function TopMarket() {
  const { coins, isLoading, lastUpdated } = useTopCoins();

  if (isLoading || !coins.length) {
    return (
      <ThemedView>
        <Spinner />
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      <ScrollView>
        <VStack className="px-5 py-4 flex-1" space="lg">
          <CardTitle lastUpdated={lastUpdated} />
          <Screen safeArea={true}>
            <TopMarketTable coins={coins} />
          </Screen>
        </VStack>
      </ScrollView>
    </ThemedView>
  );
}
