import React, { useContext } from "react";
import { WebView } from "react-native-webview";
import { Dimensions, View } from "react-native";
import { ThemeContext } from "../ui/theme-provider";

interface WidgetProps {
  symbol: string;
}

const CurrencyChartWidget: React.FC<WidgetProps> = ({ symbol }) => {
  const { colorMode } = useContext(ThemeContext);
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <style>
          body {
            margin: 0;
            padding: 0;
            width: 100vw;
            height: 100vh;
          }
          .tradingview-widget-container {
            width: 100%;
            height: 100%;
          }
            
        </style>
      </head>
      <body>
        <div class="tradingview-widget-container">
          <script src="https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js">
            ${JSON.stringify({
              symbols: [["CRYPTO:" + symbol + "USD|1M"]],
              chartOnly: false,
              width: "100%",
              height: "100%",
              colorTheme: colorMode,
              displayMode: "mobile",
              isTransparent: true,
              showVolume: false,
              showMA: false,
              hideDateRanges: false,
              hideMarketStatus: false,
              hideSymbolLogo: false,
              scalePosition: "right",
              scaleMode: "Normal",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
              fontSize: "12",
              noTimeScale: false,
              valuesTracking: "1",
              changeMode: "price-and-percent",
              chartType: "area",
            })}
          </script>
        </div>
      </body>
    </html>
  `;

  return (
    <View
      style={{
        height: 400,
        backgroundColor: "transparent",
        width: Dimensions.get("window").width - 30,
      }}
    >
      <WebView
        key={`technical-${symbol}`}
        source={{ html: htmlContent }}
        javaScriptEnabled={true}
        scalesPageToFit={false}
        viewportContent={
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        }
        style={{ flex: 1, backgroundColor: "transparent" }}
        scrollEnabled={false}
        bounces={false}
        automaticallyAdjustContentInsets={false}
        cacheEnabled={false}
        incognito={true}
        thirdPartyCookiesEnabled={false}
      />
    </View>
  );
};

export default CurrencyChartWidget;
