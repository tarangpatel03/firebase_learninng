import React from 'react';
import {
  View,
  Keyboard,
  Platform,
  ViewStyle,
  StyleProp,
  StyleSheet,
  ScrollView,
  ScrollViewProps,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

interface ScreenProps {
  children: React.ReactNode;
  preset?: 'fixed' | 'scroll';
  safeAreaEdges?: Edge[];
  backgroundColor?: string;
  keyboardAvoiding?: boolean;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  dismissKeyboardOnTouch?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  scrollViewProps?: Omit<ScrollViewProps, 'contentContainerStyle'>;
  testID?: string;
}

export const AppScreen = ({
  children,
  preset = 'fixed',
  safeAreaEdges = ['top', 'bottom'],
  backgroundColor,
  keyboardAvoiding = false,
  keyboardShouldPersistTaps = 'handled',
  dismissKeyboardOnTouch = false,
  contentContainerStyle,
  style,
  scrollViewProps,
  testID,
}: ScreenProps) => {
  const content =
    preset === 'scroll' ? (
      <ScrollView
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        contentContainerStyle={[styles.flexGrow1, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    ) : (
      <View style={[styles.flex1, contentContainerStyle]}>{children}</View>
    );

  const wrappedContent = dismissKeyboardOnTouch ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.flex1}>{content}</View>
    </TouchableWithoutFeedback>
  ) : (
    content
  );

  const finalContent = keyboardAvoiding ? (
    <KeyboardAvoidingView
      style={styles.flex1}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {wrappedContent}
    </KeyboardAvoidingView>
  ) : (
    wrappedContent
  );

  return (
    <SafeAreaView
      testID={testID}
      edges={safeAreaEdges}
      style={[
        styles.flex1,
        {
          backgroundColor: backgroundColor,
        },
        style,
      ]}
    >
      {finalContent}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
});
