import { coinGeckoApi } from "./axiosConfig";
import { ITopCurrencyData } from "@/models/IMarketData";
import { IChartData } from "@/models/IChartData";
import { ICurrencyData } from "@/models/ICurrencyData";

export const coinGeckoService = {
  getCurrencyData: async (coinId: string) => {
    const { data } = await coinGeckoApi.get<ICurrencyData>(`/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });
    return data;
  },

  getChartData: async (coinId: string) => {
    const { data } = await coinGeckoApi.get<IChartData>(
      `/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days: 7,
          interval: "daily",
        },
      }
    );
    return data;
  },

  getTopCoins: async () => {
    const { data } = await coinGeckoApi.get<ITopCurrencyData[]>(
      "/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: false,
        },
      }
    );
    return data;
  },
};
