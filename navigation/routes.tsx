import HomestayPage from "@/components/home/HomestayPage";
import CoinDetailPage from "@/components/top/CoinDetailPage";

export const routes = [
  {
    name: "Home",
    component: HomestayPage,
    options: {
      title: "Top Ten",
    },
  },
  {
    name: "CoinDetail",
    component: CoinDetailPage,
    options: (route: any) => ({
      title: route.params?.name || "Coin Detail",
    }),
  },
];
