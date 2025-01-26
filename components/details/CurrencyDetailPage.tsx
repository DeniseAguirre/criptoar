import React, { useEffect, useLayoutEffect, useState } from "react";

import { useRoute } from "@react-navigation/native";

import { StyleSheet } from "react-native";
import ThemedView from "../common/ThemedView";

import { Spinner } from "../ui/spinner";
import { useNavigation } from "expo-router";
import { Pressable } from "../ui";
import { ArrowLeftIcon } from "lucide-react-native";
import CurrencyChart from "./CurrencyChart";
import { ICurrencyData } from "@/models/ICurrencyData";
import { coinGeckoService } from "@/services/api/coinGeckoService";

function CurrencyDetail() {
  const navigation = useNavigation();
  const [data, setData] = useState<ICurrencyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRoute();
  const { id } = route.params as {
    id: string;
  };

  const fetchDetails = async (id: string) => {
    try {
      const response = await coinGeckoService.getCurrencyData(id);
      setData(response);
    } catch (error) {
      throw new Error("An error has ocurred: " + String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetails(String(id));
    }
  }, [id]);

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
      title: data?.name ?? "",
    });
  }, [navigation, data?.name]);

  if (loading || !data) {
    return (
      <ThemedView style={styles.container}>
        <Spinner />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <CurrencyChart symbol={data?.symbol ?? ""} />
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
