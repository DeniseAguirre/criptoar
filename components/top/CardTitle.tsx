import React from "react";
import { Heading, HStack, Image, Text, VStack } from "../ui";
import { LinearGradient } from "../ui/linear-gradient";
import { formatDate } from "@/utils/dateFormatter";

interface CardTitleProps {
  lastUpdated: string;
}

function CardTitle({ lastUpdated }: Readonly<CardTitleProps>) {
  return (
    <LinearGradient
      className="w-full rounded-lg items-start p-6"
      colors={["#8637CF", "#0F55A1"]}
      start={[0, 1]}
      end={[1, 0]}
    >
      <HStack>
        <VStack className="w-1/2 ">
          <Heading size="xl" className="mb-1" style={{ color: "white" }}>
            Top 10 Criptomonedas
          </Heading>
          {lastUpdated && (
            <Text className="text-sm text-white mt-2">
              Última actualización: {formatDate(lastUpdated)}
            </Text>
          )}
        </VStack>
        <VStack className="w-1/2 items-end">
          <Image
            source={require("../../assets/images/Sandglass&Bitcoin-2.png")}
            className="w-32 h-32"
            alt="image"
          />
        </VStack>
      </HStack>
    </LinearGradient>
  );
}

export default CardTitle;
