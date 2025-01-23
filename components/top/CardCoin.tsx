import { ImageSourcePropType, View } from "react-native";
import { Text } from "../ui/text";
import { HStack } from "../ui/hstack";
import { Avatar, AvatarImage } from "../ui/avatar";
import { VStack } from "../ui/vstack";
import { formatPrice } from "@/utils/priceFormatter";
import { ITopCurrencyData } from "@/models/IMarketData";

interface CardCoinProps {
  coin: ITopCurrencyData;
  variant?: "simple" | "detailed";
  id?: string;
}

const CardCoin: React.FC<CardCoinProps> = ({
  variant = "simple",

  coin,
}) => {
  if (!coin.name || !coin.symbol) {
    return (
      <View>
        <Text>Cargando datos de la moneda...</Text>
      </View>
    );
  }

  const imageSource: ImageSourcePropType = coin.image
    ? { uri: coin.image }
    : { uri: coin.image as unknown as string };

  return (
    <HStack className="justify-between items-center w-full">
      <HStack space="lg">
        <Avatar>
          <AvatarImage source={imageSource} />
        </Avatar>
        <VStack>
          <Text className="font-bold">{coin.name}</Text>
          <Text className="uppercase">{coin.symbol}</Text>
        </VStack>
      </HStack>

      {variant === "detailed" && Boolean(coin.current_price) && (
        <Text className="font-bold text-white text-2xl">
          {formatPrice(coin.current_price ?? 0)}
        </Text>
      )}
    </HStack>
  );
};

export default CardCoin;
