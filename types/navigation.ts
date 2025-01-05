import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  CoinDetail: { id: string; name: string };
};

export type CoinDetailRouteProp = RouteProp<RootStackParamList, "CoinDetail">;
export type CoinDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CoinDetail"
>;
