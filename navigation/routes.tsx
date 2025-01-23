import CurrencyDetail from "@/components/details/CurrencyDetailPage";
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
];
