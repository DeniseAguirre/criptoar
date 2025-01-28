import React, { useContext } from "react";
import { WebView } from "react-native-webview";
import { Dimensions, View } from "react-native";
import { ThemeContext } from "../ui/theme-provider";

interface WidgetProps {
  symbol: string;
}

const TechnicalAnalysisWidget = ({ symbol }: WidgetProps) => {
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
          <div class="tradingview-widget-container__widget"></div>
          <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js">
            ${JSON.stringify({
              interval: "1m",
              width: "100%",
              height: "100%",
              isTransparent: true,
              symbol: "CRYPTO:" + symbol + "USD",
              showIntervalTabs: true,
              displayMode: "mobile",
              locale: "es",
              colorTheme: colorMode,
            })}
          </script>
        </div>
      </body>
    </html>
  `;

  return (
    <View
      style={{
        height: 450,
        backgroundColor: "transparent",
        width: Dimensions.get("window").width - 30,
      }}
    >
      <WebView
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
      />
    </View>
  );
};

export default TechnicalAnalysisWidget;
