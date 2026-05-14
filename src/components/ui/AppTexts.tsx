import { useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';

type AppTextProps = TextProps & {
  children: React.ReactNode;
  weight?: string;
  fontSize?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
};

export const AppText = ({
  children,
  weight = '500',
  fontSize = 16,
  color,
  style,
  ...rest
}: AppTextProps) => {
  const textStyle = useMemo(() => {
    return {
      fontWeight: weight,
      fontSize,
      color,
    } as TextStyle;
  }, [weight, fontSize, color]);

  return (
    <Text {...rest} style={StyleSheet.flatten([textStyle, style])}>
      {children}
    </Text>
  );
};
