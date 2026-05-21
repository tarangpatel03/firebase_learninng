import { appAssets } from '@/assets';
import {
  AppInput,
  AppScreen,
  AppText,
  GlobalLoader,
  PrimaryButton,
} from '@/components';
import { appTexts } from '@/constants';
import { appColors } from '@/theme';
import FastImage from '@d11/react-native-fast-image';
import { AuthStackParamList } from '@/types/navigation.types';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useAuth, useField, useForm } from '@/hooks';
import { email, minLength, required } from '@/utils';
import { isIOS } from '@/configs';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

export const SignUpScreen = ({ navigation }: Props) => {
  const { isLoading, signUpWithEmail } = useAuth();

  const form = useForm({
    email: {
      value: '',
      validators: [required(appTexts.EMAIL_REQUIRED), email()],
    },
    password: {
      value: '',
      validators: [required(appTexts.PASSWORD_REQUIRED), minLength(6)],
    },
  });
  const emailField = useField(form, 'email');
  const passwordField = useField(form, 'password');

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

  const signUp = () => {
    form.handleSubmit(async values => {
      try {
        const res = await signUpWithEmail(values.email, values.password);
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
          <AppText style={styles.title}>{appTexts.SIGN_UP}</AppText>
          <AppText style={styles.subTitle}>{appTexts.SIGN_UP_DESC}</AppText>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainers}>
            <AppInput
              label="Email"
              autoCapitalize="none"
              value={emailField.value}
              onChangeText={emailField.onChangeText}
              onBlur={emailField.onBlur}
              error={emailField.error}
            />
            <AppInput
              label="Password"
              isPassword
              autoCapitalize="none"
              value={passwordField.value}
              onChangeText={passwordField.onChangeText}
              onBlur={passwordField.onBlur}
              error={passwordField.error}
            />
          </View>
          <PrimaryButton
            onPress={signUp}
            buttonText={appTexts.REGISTER}
            containerStyle={styles.button}
          />
          <View style={styles.inputContainers}>
            <View style={styles.orLine}>
              <View style={styles.separator} />
              <AppText style={styles.orText}>{appTexts.OR}</AppText>
              <View style={styles.separator} />
            </View>
            <PrimaryButton
              textStyle={styles.socialText}
              containerStyle={styles.socialButton}
              leftIcon={appAssets.icons.ic_google}
              buttonText={appTexts.CONTINUE_WITH_GOOGLE}
            />
            {isIOS && (
              <PrimaryButton
                textStyle={styles.socialText}
                leftIcon={appAssets.icons.ic_apple}
                containerStyle={styles.socialButton}
                buttonText={appTexts.CONTINUE_WITH_APPLE}
              />
            )}
          </View>
        </View>
      </View>
      <AppText style={[styles.subTitle, styles.createAccountLine]}>
        {appTexts.ALREADY_HAVE_ACCOUNT}{' '}
        <AppText style={styles.forgotPassword} onPress={navigateBack}>
          {appTexts.LOG_IN}
        </AppText>
      </AppText>
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
  headerContainer: {
    gap: 12,
  },
  formContainer: {
    gap: 24,
  },
  inputContainers: {
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  forgotPassword: {
    fontSize: 12,
    color: appColors.app_4D81E7,
    alignSelf: 'flex-end',
    fontWeight: 'semibold',
  },
  button: {
    height: 48,
  },
  socialButton: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: appColors.white,
    borderColor: appColors.separator,
  },
  socialText: {
    fontSize: 14,
    fontWeight: 'semibold',
    color: appColors.primaryText,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: 'medium',
    color: appColors.app_6C7278,
  },
  orLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  orText: {
    fontSize: 12,
    fontWeight: 'regular',
    color: appColors.app_6C7278,
  },
  createAccountLine: {
    paddingBottom: 12,
    alignSelf: 'center',
  },
  separator: {
    flex: 1,
    height: 1,
    width: '100%',
    backgroundColor: appColors.separator,
  },
});
