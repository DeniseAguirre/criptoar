import React, { useContext } from "react";
import { Dimensions, View, Text } from "react-native";
import {
  Area,
  CartesianChart,
  useChartPressState,
  useChartTransformState,
} from "victory-native";
import { LinearGradient, useFont, vec } from "@shopify/react-native-skia";
import ToolTip from "./Tooltip";
import { ThemeContext } from "../ui/theme-provider";
import { IChartData } from "@/models/IChartData";
import { useDerivedValue } from "react-native-reanimated";
import ReanimatedText from "../common/ReanimatedText";

interface CurrencyChartProps {
  currencyChartData: IChartData | null;
}

const CurrencyChartVN: React.FC<CurrencyChartProps> = ({
  currencyChartData,
}) => {
  const font = useFont(require("../../assets/fonts/Inter_24pt-Light.ttf"), 12);
  const { state, isActive } = useChartPressState({
    x: "day",
    y: { highTmp: 0 },
  });
  const { state: transformState } = useChartTransformState();
  const { colorMode } = useContext(ThemeContext);
  const labelColor = colorMode === "light" ? "black" : "white";

  const formattedValue = useDerivedValue(() => {
    const value = state.y.highTmp.value?.get();
    return value ? ` ${value.toFixed(4)} ` : "";
  });

  if (!currencyChartData?.prices || currencyChartData.prices.length === 0) {
    return (
      <View
        style={{
          height: 280,
          backgroundColor: "transparent",
          width: Dimensions.get("window").width - 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>No hay datos disponibles</Text>
      </View>
    );
  }

  const transformedData = currencyChartData.prices
    .map(([timestamp, price]) => {
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      return {
        day: `${day}/${month}`,
        highTmp: price || 0,
      };
    })
    .filter((data) => data.highTmp !== 0);

  if (transformedData.length === 0) {
    return (
      <View
        style={{
          height: 280,
          backgroundColor: "transparent",
          width: Dimensions.get("window").width - 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>No hay datos válidos para mostrar</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        height: 280,
        backgroundColor: "transparent",
        width: Dimensions.get("window").width - 20,
      }}
    >
      <CartesianChart
        data={transformedData}
        xKey="day"
        yKeys={["highTmp"]}
        axisOptions={{
          font,
          labelColor: labelColor,
          axisSide: {
            x: "bottom",
            y: "right",
          },
        }}
        chartPressState={state}
        padding={{ left: 0, right: 10, top: 20, bottom: 20 }}
        transformState={transformState}
        renderOutside={(isActive) => {
          if (!isActive || !state.y.highTmp.value) return null;

          return (
            <ReanimatedText
              x={state.x.position}
              y={state.y.highTmp.position}
              text={formattedValue}
              color={labelColor}
              font={font}
            />
          );
        }}
      >
        {({ points, chartBounds }) => (
          <>
            <Area
              points={points.highTmp}
              y0={chartBounds.bottom}
              animate={{ type: "timing", duration: 300 }}
              connectMissingData={true}
            >
              <LinearGradient
                start={vec(0, 0)}
                end={vec(0, 400)}
                colors={["#a78bfa", "#a78bfa50"]}
              />
            </Area>

            {isActive && (
              <ToolTip x={state.x.position} y={state.y.highTmp.position} />
            )}
          </>
        )}
      </CartesianChart>
    </View>
  );
};

export default CurrencyChartVN;
