import CurrencyDetail from "@/components/details/CurrencyDetailPage";
import CryptocurrencyMarket from "@/components/market/CryptocurrencyMarket";
import TopMarket from "@/components/top/TopMarketPage";

export const routes = [
  {
    name: "Home",
    component: TopMarket,
    options: {
      title: "Top Ten",
    },
  },
  {
    name: "CurrencyDetail",
    component: CurrencyDetail,
    options: (route: any) => ({
      title: route.params?.name || "Currency Detail",
    }),
  },
  {
    name: "CryptocurrencyMarket",
    component: CryptocurrencyMarket,
    options: {
      title: "Cryptocurrency Market",
    },
  },
];
