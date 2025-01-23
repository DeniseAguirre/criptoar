import React, { useLayoutEffect } from "react";

import { useRoute } from "@react-navigation/native";

import { StyleSheet } from "react-native";
import ThemedView from "../common/ThemedView";

import CardCoin from "../top/CardCoin";
import { Spinner } from "../ui/spinner";
import { useCoinGeckoData } from "@/hooks/useCoinGeckoData";
import { useNavigation } from "expo-router";
import { Pressable } from "../ui";
import { ArrowLeftIcon } from "lucide-react-native";
import CurrencyChartVN from "./CurrencyChartVN";
import { ITopCurrencyData } from "@/models/IMarketData";

function CurrencyDetail() {
  const navigation = useNavigation();

  const route = useRoute();
  const { id, coin } = route.params as {
    id: string;
    coin: ITopCurrencyData;
  };
  const { currencyData, chartData, isLoading } = useCoinGeckoData(id);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.goBack()}
          className="ml-4 flex-row items-center"
        >
          <ArrowLeftIcon size={24} color="white" />
        </Pressable>
      ),
      // title: currencyData?.name ?? "",
    });
  }, [navigation, currencyData?.name]);

  if (isLoading || !chartData) {
    return (
      <ThemedView style={styles.container}>
        <Spinner />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <CardCoin coin={coin} variant="detailed" />
      <CurrencyChartVN currencyChartData={chartData} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default CurrencyDetail;
