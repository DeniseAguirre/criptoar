import { Text, useFont } from "@shopify/react-native-skia";
import { SharedValue, useDerivedValue } from "react-native-reanimated";

type ReanimatedTextProps = {
  x: SharedValue<number>;
  y: SharedValue<number>;
  text: SharedValue<string>;
  color: string;
  font: ReturnType<typeof useFont> | null;
};

const ReanimatedText = ({ x, y, text, color, font }: ReanimatedTextProps) => {
  const xPos = useDerivedValue(() => x.value);
  const yPos = useDerivedValue(() => y.value);
  const displayText = useDerivedValue(() => text.value);

  if (!font) return null;

  return (
    <Text x={xPos} y={yPos} text={displayText} color={color} font={font} />
  );
};

export default ReanimatedText;
