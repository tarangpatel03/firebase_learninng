import { appAssets } from '@/assets';
import {
  AppInput,
  AppScreen,
  AppText,
  GlobalLoader,
  PrimaryButton,
} from '@/components';
import { appTexts } from '@/constants';
import { useField } from '@/hooks/form/useField';
import { useForm } from '@/hooks/form/useForm';
import { useAuth } from '@/hooks/useAuthHook';
import { appColors } from '@/theme';
import { AuthStackParamList } from '@/types/navigation.types';
import { email, required } from '@/utils';
import FastImage from '@d11/react-native-fast-image';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen = ({ navigation }: Props) => {
  const { forgotPassword, isLoading } = useAuth();

  const form = useForm({
    email: {
      value: '',
      validators: [required(appTexts.EMAIL_REQUIRED), email()],
    },
  });
  const emailField = useField(form, 'email');

  useFocusEffect(
    useCallback(() => {
      return () => {
        form.resetForm();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const navigateBack = () => {
    navigation.goBack();
  };

  const onResetPasswordPress = () => {
    form.handleSubmit(async values => {
      try {
        const res = await forgotPassword(values.email);
        if (res) {
          navigateBack();
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <AppScreen>
      {isLoading && <GlobalLoader />}
      <Pressable style={styles.backButton} onPress={navigateBack}>
        <FastImage
          source={appAssets.icons.ic_back_arrow}
          style={styles.backIcon}
          resizeMode="contain"
        />
      </Pressable>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <AppText style={styles.title}>
            {appTexts.FORGOT_PASSWORD_TITLE}
          </AppText>
          <AppText style={styles.subTitle}>
            {appTexts.FORGOT_PASSWORD_DESC}
          </AppText>
        </View>
        <View style={styles.formContainer}>
          <AppInput
            label="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={emailField.value}
            onChangeText={emailField.onChangeText}
            onBlur={emailField.onBlur}
            error={emailField.error}
          />
          <PrimaryButton
            onPress={onResetPasswordPress}
            buttonText={appTexts.SEND_RESET_LINK}
            containerStyle={styles.button}
          />
        </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    paddingTop: 30,
    paddingHorizontal: 24,
  },
  backButton: {
    width: 32,
    height: 32,
    top: 12,
    left: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerContainer: {
    gap: 12,
  },
  formContainer: {
    gap: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: 'medium',
    color: appColors.app_6C7278,
  },
  button: {
    height: 48,
  },
});
