import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { appTexts } from '@/constants';
import { appColors } from '@/theme';
import { AppText } from './ui/AppTexts';
import { PrimaryButton } from './ui/PrimaryButton';

type LogoutConfirmationModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  onConfirm: () => void;
};

export const LogoutConfirmationModal = ({
  isOpen,
  closeModal,
  onConfirm,
}: LogoutConfirmationModalProps) => {
  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={isOpen}
    >
      <Pressable style={styles.container} onPress={closeModal}>
        <Pressable style={styles.modalContainer}>
          <AppText style={styles.title}>{appTexts.LOGOUT_TITLE}</AppText>
          <AppText style={styles.description}>
            {appTexts.LOGOUT_CONFIRMATION}
          </AppText>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              buttonText={appTexts.LOGOUT}
              onPress={onConfirm}
              containerStyle={[styles.button, styles.logoutButton]}
            />
            <PrimaryButton
              buttonText={appTexts.CANCEL}
              onPress={closeModal}
              containerStyle={[styles.button, styles.cancelButton]}
              textStyle={styles.cancelText}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.app_00000080,
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: appColors.white,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: appColors.app_6C7278,
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
  },
  logoutButton: {
    backgroundColor: appColors.app_DC2828,
  },
  cancelButton: {
    borderWidth: 1,
    backgroundColor: appColors.white,
    borderColor: appColors.separator,
  },
  cancelText: {
    color: appColors.primaryText,
  },
});
