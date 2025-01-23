import { useState, useEffect, useRef } from "react";
import { ITopCurrencyData } from "@/models/IMarketData";
import { coinGeckoService } from "@/services/api/coinGeckoService";
import axios from "axios";

interface TopCurrencyState {
  coins: ITopCurrencyData[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: string;
}

export const useTopCoins = () => {
  const [state, setState] = useState<TopCurrencyState>({
    coins: [],
    isLoading: true,
    error: null,
    lastUpdated: "",
  });

  const intervalRef = useRef<NodeJS.Timeout>();

  const fetchTopCoins = async () => {
    try {
      const response = await coinGeckoService.getTopCoins();

      setState({
        coins: response,
        isLoading: false,
        error: null,
        lastUpdated: new Date().toISOString(),
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        lastUpdated: new Date().toISOString(),
      }));
    }
  };

  useEffect(() => {
    fetchTopCoins();

    intervalRef.current = setInterval(fetchTopCoins, 30000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return state;
};
