import React from "react";

import { Badge, BadgeIcon, BadgeText, Box, Link, Text } from "../ui";
import { ICurrencyData } from "@/models/ICurrencyData";
import { Globe } from "lucide-react-native";
import { formatPrice } from "@/utils/priceFormatter";
import formatCurrencyShort from "@/utils/formatCurrencyShort";

interface CurrencyInfoProps {
  readonly currency: ICurrencyData;
}

export default function CurrencyInfo({ currency }: CurrencyInfoProps) {
  return (
    <Box className="flex-1 ">
      <Box className="border border-gray-200 p-5 rounded-md mt-4 flex-1">
        <Text className="font-bold">Información</Text>
        <Box className="flex-1 flex-row justify-between">
          <Text className="">Cap. de mercado</Text>
          <Text className="">
            {formatPrice(currency.market_data.market_cap.usd)}
          </Text>
        </Box>
        <Box className="flex-1 flex-row justify-between">
          <Text className="">Cantidad circulante</Text>
          <Text className="">
            {formatCurrencyShort(currency.market_data.circulating_supply)}
          </Text>
        </Box>
        <Box className="flex-1 flex-row justify-between">
          <Text className="">Cantidad total</Text>
          <Text className="">
            {formatCurrencyShort(currency.market_data.total_supply)}
          </Text>
        </Box>
        <Text className="font-bold mt-2">Datos históricos</Text>
        <Box className="flex-1 flex-row justify-between">
          <Text className="">Máximo en 24hs</Text>
          <Text className="">
            {formatPrice(currency.market_data.high_24h.usd)}
          </Text>
        </Box>
        <Box className="flex-1 flex-row justify-between">
          <Text className="">Mínimo en 24hs</Text>
          <Text className="">
            {formatPrice(currency.market_data.low_24h.usd)}
          </Text>
        </Box>
        <Box className="flex-1 flex-row justify-between">
          <Text className="">Máximo histórico</Text>
          <Text className="">{formatPrice(currency.market_data.ath.usd)}</Text>
        </Box>
        <Box className="flex-1 flex-row justify-between">
          <Text className="">Mínimo histórico</Text>
          <Text className="">{formatPrice(currency.market_data.atl.usd)}</Text>
        </Box>
      </Box>
      <Box className="border border-gray-200 p-5 rounded-md mt-4 flex-1">
        <Text className="font-bold mb-2">Enlaces</Text>

        <Box className="flex-1 flex-row justify-between">
          <Text className="">Sitio web</Text>
          <Link href={currency.links.homepage[0]} isExternal>
            <Badge size="md" variant="solid" action="info" className="ml-1">
              <BadgeIcon as={Globe} className="mr-2" />
              <BadgeText>
                {currency.links?.homepage[0]?.split("//")[1]}
              </BadgeText>
            </Badge>
          </Link>
        </Box>
        <Text className="font-bold my-2">Comunidad</Text>

        <Box className="flex-1 flex-row justify-between">
          <Text className="">Reddit</Text>
          <Link href={currency.links.subreddit_url} isExternal>
            <Badge size="md" variant="solid" action="info" className="ml-1">
              <BadgeText>
                {currency.links?.subreddit_url?.split("/")[4]}
              </BadgeText>
            </Badge>
          </Link>
        </Box>
        {currency.links.whitepaper && (
          <Box className="flex-1 flex-row justify-between">
            <Text className="">Whitepaper</Text>
            <Link href={currency.links.whitepaper} isExternal>
              <Badge size="md" variant="solid" action="info" className="ml-1">
                <BadgeText>
                  {currency.links?.whitepaper.split("/")[2]}
                </BadgeText>
              </Badge>
            </Link>
          </Box>
        )}
        {currency.links.repos_url.github[0] && (
          <Box className="flex-1 flex-row justify-between">
            <Text className="">Github</Text>
            <Link href={currency.links.repos_url.github[0]} isExternal>
              <Badge size="md" variant="solid" action="info" className="ml-1">
                <BadgeText>
                  {currency.links.repos_url.github[0].split("/")[2]}
                </BadgeText>
              </Badge>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
}
