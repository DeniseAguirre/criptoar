import React from "react";
import { Box, ScrollView } from "../ui";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ICoinData } from "@/models/ICoin";
import CardCoin from "./CardCoin";
import { formatPrice } from "@/utils/formatPrice";
import { formatPercentage } from "@/utils/formatPercentage";
import { StyleSheet } from "react-native";

interface ITableItemProps {
  readonly coins: ICoinData[];
}

function CryptoTable({ coins }: ITableItemProps) {
  return (
    <Box style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={[styles.cell, styles.assetCell]}>
                Assets
              </TableHead>
              <TableHead style={[styles.cell, styles.assetCell]}>
                Price
              </TableHead>
              <TableHead style={[styles.cell, styles.assetCell]}>
                24 hs
              </TableHead>
              <TableHead style={[styles.cell, styles.assetCell]}>
                Market Cap
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coins.map((coin) => (
              <TableRow key={coin.id}>
                <TableData style={[styles.cell, styles.assetCell]}>
                  <CardCoin coin={coin} />
                </TableData>
                <TableData
                  className="font-bold"
                  style={[styles.cell, styles.assetCell]}
                >
                  {formatPrice(coin.current_price)}
                </TableData>
                <TableData
                  style={{
                    ...styles.cell,
                    ...styles.assetCell,
                    color: coin.market_cap_change_percentage_24h
                      .toString()
                      .includes("-")
                      ? "red"
                      : "#23ab42",
                    fontWeight: "bold",
                  }}
                >
                  {coin.market_cap_change_percentage_24h
                    .toString()
                    .includes("-")
                    ? "▼ "
                    : "▲ "}

                  {formatPercentage(coin.market_cap_change_percentage_24h)}
                </TableData>
                <TableData
                  className="text-sm"
                  style={[styles.cell, styles.assetCell]}
                >
                  {formatPrice(coin.market_cap)}
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cell: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  assetCell: {
    minWidth: 120,
  },
});

export default CryptoTable;
