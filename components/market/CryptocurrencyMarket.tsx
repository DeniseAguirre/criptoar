import React, { useContext } from "react";
import { WebView } from "react-native-webview";
import { Dimensions, View } from "react-native";
import { ThemeContext } from "../ui/theme-provider";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";

const CryptocurrencyMarket: React.FC = () => {
  const { colorMode } = useContext(ThemeContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
          <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-screener.js">
            ${JSON.stringify({
              width: "100%",
              height: "100%",
              defaultColumn: "overview",
              screener_type: "crypto_mkt",
              displayCurrency: "USD",
              colorTheme: colorMode,
              locale: "en",
              isTransparent: true,
              displayMode: "mobile",
            })}
          </script>
        </div>
      </body>
    </html>
  `;

  return (
    <View
      style={{
        height: Dimensions.get("window").height - 100,
        backgroundColor: "transparent",
        width: Dimensions.get("window").width,
      }}
    >
      <WebView
        source={{ html: htmlContent }}
        javaScriptEnabled={true}
        scalesPageToFit={false}
        viewportContent={
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        }
        style={{ flex: 1 }}
        scrollEnabled={true}
        bounces={false}
        automaticallyAdjustContentInsets={false}
        cacheEnabled={false}
        incognito={true}
        onShouldStartLoadWithRequest={(request) => {
          if (
            request.url !== "about:blank" &&
            request.url.includes("tradingview.com/symbols/")
          ) {
            const symbol = request.url.split("BINANCE-")[1].split("/")[0];
            console.log(symbol);
            if (symbol) {
              navigation.navigate("CurrencyDetail", { id: symbol });
              return false;
            }
          }
          return true;
        }}
      />
    </View>
  );
};

export default CryptocurrencyMarket;
