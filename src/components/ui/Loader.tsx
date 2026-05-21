import { appColors } from '@/theme';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export const GlobalLoader = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator size={'large'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.app_00000080,
  },
  activityIndicatorWrapper: {
    backgroundColor: appColors.white,
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
