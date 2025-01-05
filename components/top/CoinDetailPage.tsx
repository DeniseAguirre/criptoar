import React, { useEffect, useState } from "react";

import { useRoute } from "@react-navigation/native";
import { ICoinData } from "@/models/ICoin";
import { formatPrice } from "@/utils/formatPrice";
import { formatPercentage } from "@/utils/formatPercentage";
import { Text } from "../ui";
import { StyleSheet } from "react-native";
import ThemedView from "../common/ThemedView";

function CoinDetailPage() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const [coinData, setCoinData] = useState<ICoinData | null>(null);

  useEffect(() => {
    // Aquí deberías hacer una llamada a tu API para obtener los detalles de la moneda
    // Por ahora, usaremos datos de ejemplo
    const fetchCoinData = async () => {
      // Simula una llamada a la API
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setCoinData(data);
    };

    fetchCoinData();
  }, [id]);

  if (!coinData) {
    return <Text>Aca va un spinner...</Text>;
  }

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>{coinData.name}</Text>
      {/* <Text style={styles.price}>{formatPrice(coinData.current_price)}</Text>
      <Text style={styles.change}>
        24h Change:{" "}
        {formatPercentage(coinData.market_cap_change_percentage_24h)}
      </Text>
      <Text style={styles.marketCap}>
        Market Cap: {formatPrice(coinData.market_cap)}
      </Text> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    marginBottom: 10,
  },
  change: {
    fontSize: 16,
    marginBottom: 10,
  },
  marketCap: {
    fontSize: 16,
  },
});

export default CoinDetailPage;
