import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface IScreenProps {
  safeArea?: boolean;
  children?: React.ReactNode;
  style?: any;
  [key: string]: any;
}

export function Screen({
  safeArea,
  children,
  style,
  ...props
}: Readonly<IScreenProps>) {
  const insets = useSafeAreaInsets();
  const styles = safeArea
    ? { ...style, ...{ paddingBottom: insets.bottom } }
    : style;
  return (
    <ScrollView style={styles} {...props}>
      {children}
    </ScrollView>
  );
}
