import { ITopCurrencyData } from "@/models/IMarketData";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  CurrencyDetail: {
    id: string;
    coin: ITopCurrencyData;
  };
};

export type CurrencyDetailRouteProp = RouteProp<
  RootStackParamList,
  "CurrencyDetail"
>;
export type CurrencyDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CurrencyDetail"
>;
