import { ICoinData } from "@/models/ICoin";

import { Image, ImageSourcePropType } from "react-native";
import { formatPrice } from "@/utils/formatPrice";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

interface ICardItemProps {
  readonly coin: ICoinData;
}

export default function CardItem({ coin }: ICardItemProps) {
  const imageSource: ImageSourcePropType =
    typeof coin.image === "string"
      ? { uri: coin.image }
      : { uri: coin.image.large };

  return (
    // <View className="border-2 border-gray-400 rounded-md p-2 h-24 mb-2 items-center flex flex-row justify-between">
    //   <View className="flex flex-row items-center">
    //     <Text className="mx-2 text-gray-500">{coin.market_cap_rank}</Text>
    //     <Image
    //       source={imageSource}
    //       style={{ width: 50, height: 50, borderRadius: 25 }}
    //     />
    //     <View className="ml-2">
    //       <Text className="text-lg">{coin.name}</Text>
    //       <Text className="uppercase text-sm">{coin.symbol}</Text>
    //     </View>
    //   </View>
    //   <View className="mr-2">
    //     <Text className="text-xl font-regular">
    //       {formatPrice(coin.current_price)}
    //     </Text>
    //   </View>
    // </View>

    <Card size="md" variant="filled" className="m-3">
      <Heading size="md" className="mb-1">
        Quick Start
      </Heading>
      <Text size="sm">Start building your next project in minutes</Text>
    </Card>
  );
}
