import { AppScreen, AppText } from '@/components/ui';
import { appTexts } from '@/constants';
import { AuthStackParamList } from '@/types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

export const SignUpScreen = ({}: Props) => {
  return (
    <AppScreen>
      <View>
        <AppText>{appTexts.SIGN_UP}</AppText>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {},
});
