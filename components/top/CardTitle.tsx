import React from "react";
import { Heading, HStack, Image, Text, VStack } from "../ui";
import { LinearGradient } from "../ui/linear-gradient";

function CardTitle() {
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
          <Text size="sm" style={{ color: "white" }}>
            Start building your next project in minutes
          </Text>
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
