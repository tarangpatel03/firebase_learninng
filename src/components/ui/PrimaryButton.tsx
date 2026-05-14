import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  PressableProps,
  TextStyle,
  ViewStyle,
  StyleProp,
} from 'react-native';
import FastImage, { Source } from '@d11/react-native-fast-image';
import { appColors } from '@/theme';

type ButtonBaseProps = PressableProps & {
  buttonText: string;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  leftIcon?: number | Source | undefined;
  rightIcon?: number | Source | undefined;
  loading?: boolean;
  disabled?: boolean;
};

export const PrimaryButton = ({
  buttonText,
  textStyle,
  containerStyle,
  leftIcon,
  rightIcon,
  loading,
  disabled,
  onPress,
  ...rest
}: ButtonBaseProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      {...rest}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        containerStyle,
        pressed && styles.pressed,
        isDisabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={appColors.white} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <FastImage style={styles.icon} source={leftIcon} />}

          <Text style={[styles.text, textStyle]}>{buttonText}</Text>

          {rightIcon && <FastImage style={styles.icon} source={rightIcon} />}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: appColors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
});
