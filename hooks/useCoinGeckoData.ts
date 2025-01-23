import { useState, useEffect } from "react";

import { IChartData } from "@/models/IChartData";
import { coinGeckoService } from "@/services/api/coinGeckoService";
import axios from "axios";
import { ICurrencyData } from "@/models/ICurrencyData";

interface CoinGeckoState {
  currencyData: ICurrencyData | null;
  chartData: IChartData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CoinGeckoState = {
  currencyData: null,
  chartData: null,
  isLoading: true,
  error: null,
};

export const useCoinGeckoData = (coinId: string) => {
  const [state, setState] = useState<CoinGeckoState>(initialState);

  const fetchData = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const [currencyData, chartData] = await Promise.all([
        coinGeckoService.getCurrencyData(coinId),
        coinGeckoService.getChartData(coinId),
      ]);

      setState({
        currencyData,
        chartData,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [coinId]);

  return state;
};
