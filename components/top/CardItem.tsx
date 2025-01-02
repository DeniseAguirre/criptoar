import { ICoinData } from "@/models/ICoin";

import { ImageSourcePropType } from "react-native";
import { formatPrice } from "@/utils/formatPrice";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { Image } from "../ui/image";
import { Box } from "../ui/box";
interface ICardItemProps {
  readonly coin: ICoinData;
}

export default function CardItem({ coin }: ICardItemProps) {
  const imageSource: ImageSourcePropType =
    typeof coin.image === "string"
      ? { uri: coin.image }
      : { uri: coin.image.large };

  return (
    <Card
      size="md"
      variant="filled"
      className="m-3 flex flex-row items-center "
    >
      <Image
        size="md"
        source={imageSource}
        alt="image"
        className="rounded-full"
        width={50}
        height={50}
      />
      <Box className="flex flex-col ml-3 text-dark dark:text-white">
        <Heading size="md" className="mb-1 ">
          {coin.name}
        </Heading>
        <Text size="sm" className="">
          {coin.symbol}
        </Text>
      </Box>
      <Text size="md" className="font-bold">
        {formatPrice(coin.current_price)}
      </Text>
    </Card>
  );
}
