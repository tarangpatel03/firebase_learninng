import { appColors } from '@/theme';
import React, { forwardRef, useState } from 'react';
import FastImage from '@d11/react-native-fast-image';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  Pressable,
} from 'react-native';
import { appAssets } from '@/assets';

type Props = TextInputProps & {
  label?: string;
  error?: string | null;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'outlined' | 'filled';
  isPassword?: boolean;
};

export const AppInput = forwardRef<TextInput, Props>(
  (
    {
      label,
      error,
      style,
      leftIcon,
      rightIcon,
      variant = 'outlined',
      isPassword,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [secure, setSecure] = useState(!!isPassword);

    const borderColor = error
      ? appColors.input.error
      : isFocused
      ? appColors.input.focusBorder
      : appColors.input.border;

    const backgroundColor =
      variant === 'filled'
        ? appColors.input.filledBackground
        : appColors.input.background;

    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={[
            styles.inputWrapper,
            {
              borderColor,
              backgroundColor,
            },
          ]}
        >
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
          <TextInput
            ref={ref}
            style={[styles.input, style]}
            placeholderTextColor={appColors.input.placeholder}
            secureTextEntry={secure}
            onFocus={setIsFocused.bind(null, true)}
            onBlur={setIsFocused.bind(null, false)}
            {...props}
          />
          {isPassword ? (
            <Pressable onPress={() => setSecure(prev => !prev)}>
              <FastImage
                style={styles.secureIcon}
                source={
                  secure
                    ? appAssets.icons.ic_eye_close
                    : appAssets.icons.ic_eye_open
                }
              />
            </Pressable>
          ) : (
            rightIcon && <View style={styles.icon}>{rightIcon}</View>
          )}
        </View>
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: appColors.input.label,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: appColors.input.text,
    minWidth: 0,
  },
  icon: {
    marginHorizontal: 6,
  },
  secureIcon: {
    width: 16,
    height: 16,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: appColors.input.error,
  },
});
