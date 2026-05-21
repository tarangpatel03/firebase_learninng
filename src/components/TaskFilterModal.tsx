import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { appAssets } from '@/assets';
import { appTexts } from '@/constants';
import { appColors } from '@/theme';
import { AppText } from './ui/AppTexts';
import FastImage from '@d11/react-native-fast-image';

export type TaskFilterType = 'all' | 'completed' | 'not_completed';

type TaskFilterModalProps = {
  isOpen: boolean;
  selectedFilter: TaskFilterType;
  closeModal: () => void;
  onSelectFilter: (filter: TaskFilterType) => void;
};

const filterOptions: { label: string; value: TaskFilterType }[] = [
  { label: appTexts.ALL, value: 'all' },
  { label: appTexts.COMPLETED, value: 'completed' },
  { label: appTexts.NOT_COMPLETED, value: 'not_completed' },
];

export const TaskFilterModal = ({
  isOpen,
  selectedFilter,
  closeModal,
  onSelectFilter,
}: TaskFilterModalProps) => {
  const onOptionPress = (filter: TaskFilterType) => {
    onSelectFilter(filter);
    closeModal();
  };

  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={isOpen}
    >
      <Pressable style={styles.container} onPress={closeModal}>
        <View style={styles.handle}>
          <FastImage
            style={styles.closeIcon}
            tintColor={appColors.white}
            source={appAssets.icons.ic_add}
          />
        </View>
        <Pressable style={styles.modalContainer}>
          <AppText style={styles.title}>{appTexts.FILTER_TASKS}</AppText>
          <View>
            {filterOptions.map(option => {
              const isSelected = selectedFilter === option.value;

              return (
                <Pressable
                  key={option.value}
                  style={styles.option}
                  onPress={onOptionPress.bind(null, option.value)}
                >
                  <AppText
                    style={[styles.optionText, isSelected && styles.selected]}
                  >
                    {option.label}
                  </AppText>
                  {isSelected && (
                    <View style={styles.checkContainer}>
                      <FastImage
                        source={appAssets.icons.ic_check}
                        style={styles.checkIcon}
                        tintColor={appColors.white}
                      />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: appColors.app_00000080,
  },
  modalContainer: {
    paddingTop: 10,
    paddingBottom: 28,
    paddingHorizontal: 24,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: appColors.white,
  },
  handle: {
    width: 44,
    height: 44,
    marginBottom: 18,
    borderRadius: 22,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.black,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 12,
  },
  closeIcon: {
    width: 20,
    height: 20,
    transform: [{ rotate: '45deg' }],
  },
  option: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    color: appColors.primaryText,
  },
  selected: {
    color: appColors.primary,
    fontWeight: '600',
  },
  checkContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.primary,
  },
  checkIcon: {
    width: 12,
    height: 9,
  },
});
