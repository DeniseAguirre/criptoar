import { ICoinData } from "@/models/ICoin";
import { ImageSourcePropType } from "react-native";
import { Text } from "../ui/text";
import { HStack } from "../ui/hstack";
import { Avatar, AvatarImage } from "../ui/avatar";
import { VStack } from "../ui/vstack";
interface ICardItemProps {
  readonly coin: ICoinData;
}

export default function CardCoin({ coin }: ICardItemProps) {
  const imageSource: ImageSourcePropType =
    typeof coin.image === "string"
      ? { uri: coin.image }
      : { uri: coin.image.large };

  return (
    <HStack className="justify-between items-center">
      <HStack space="lg">
        <Avatar className="bg-primary-500">
          <AvatarImage source={imageSource} />
        </Avatar>
        <VStack>
          <Text className="font-bold">{coin.name}</Text>
          <Text className="uppercase">{coin.symbol}</Text>
        </VStack>
      </HStack>
    </HStack>
  );
}
