import { appColors } from '@/theme';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BaseToast = ({
  text1,
  type,
}: {
  text1: string;
  type: 'success' | 'error' | 'info';
}) => {
  const getStyle = () => {
    switch (type) {
      case 'success':
        return styles.successContainer;
      case 'error':
        return styles.errorContainer;
      case 'info':
        return styles.infoContainer;
      default:
        break;
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'success':
        return styles.successText;
      case 'error':
        return styles.errorText;
      case 'info':
        return styles.infoText;
      default:
        break;
    }
  };

  return (
    <View style={[styles.container, getStyle()]}>
      <View style={styles.content}>
        <Text style={[styles.text, getTextStyle()]}>{text1}</Text>
      </View>
    </View>
  );
};

export let bottomInset = 0;

export const setToastBottomInset = (value: number) => {
  bottomInset = value;
};

export const toastConfig = {
  success: (props: any) => <BaseToast {...props} type={'success'} />,
  error: (props: any) => <BaseToast {...props} type={'error'} />,
  info: (props: any) => <BaseToast {...props} type={'info'} />,
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
    alignSelf: 'center',

    // Android elevation
    elevation: 4,

    // iOS shadow
    shadowColor: appColors.black,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  successContainer: {
    backgroundColor: appColors.toast.success.background,
    borderLeftColor: appColors.toast.success.primary,
  },
  errorContainer: {
    backgroundColor: appColors.toast.error.background,
    borderLeftColor: appColors.toast.error.primary,
  },
  infoContainer: {
    backgroundColor: appColors.toast.info.background,
    borderLeftColor: appColors.toast.info.primary,
  },
  successText: {
    color: appColors.toast.success.text,
  },
  errorText: {
    color: appColors.toast.error.text,
  },
  infoText: {
    color: appColors.toast.info.text,
  },
});
