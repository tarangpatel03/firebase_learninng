import { appAssets } from '@/assets';
import { AppInput, AppScreen, AppText, PrimaryButton } from '@/components/ui';
import { appTexts } from '@/constants';
import { appColors } from '@/theme';
import FastImage from '@d11/react-native-fast-image';
import { AuthStackParamList } from '@/types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

export const SignUpScreen = ({}: Props) => {
  return (
    <AppScreen>
      <Pressable style={styles.backButton}>
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
            <AppInput label="Full Name" />
            <AppInput label="Email" />
            <AppInput label="Password" isPassword />
          </View>
          <PrimaryButton
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
            <PrimaryButton
              textStyle={styles.socialText}
              leftIcon={appAssets.icons.ic_apple}
              containerStyle={styles.socialButton}
              buttonText={appTexts.CONTINUE_WITH_APPLE}
            />
          </View>
        </View>
      </View>
      <AppText style={[styles.subTitle, styles.createAccountLine]}>
        {appTexts.ALREADY_HAVE_ACCOUNT}{' '}
        <AppText style={styles.forgotPassword}>{appTexts.LOG_IN}</AppText>
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
    color: '#4D81E7',
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
