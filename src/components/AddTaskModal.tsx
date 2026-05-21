import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { AppText } from './ui/AppTexts';
import { appTexts } from '@/constants';
import { appColors } from '@/theme';
import { AppInput } from './ui/AppInputs';
import { useField, useForm } from '@/hooks';
import { required } from '@/utils';
import { PrimaryButton } from './ui/PrimaryButton';
import { addTask } from '@/services';
import { useEffect } from 'react';
import { TaskDocument } from '@/types/task.type';
import { editTask } from '@/services/tasks.service';

type AddTaskProps = {
  uid: string;
  isEdit: boolean;
  task?: TaskDocument | null;
  isOpen: boolean;
  closeModal: () => void;
};

export const AddTaskModal = (props: AddTaskProps) => {
  const form = useForm({
    task: {
      value: props.isEdit ? props.task?.task ?? '' : '',
      validators: [required(appTexts.ENTER_TASK)],
    },
  });
  const taskField = useField(form, 'task');

  const onAddTaskPress = () => {
    form.handleSubmit(() =>
      props.isEdit
        ? editTask(
            props.uid,
            props.task?.id ?? '',
            taskField.value,
            props.task?.is_completed ?? false,
          )
        : addTask(props.uid, taskField.value),
    );
    if (form.errors) {
      return;
    }
    closeModal();
  };

  const closeModal = () => {
    form.resetForm();
    form.setFieldValue('task', '');
    props.closeModal();
  };

  useEffect(() => {
    props.isEdit && form.setFieldValue('task', props.task?.task ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isEdit, props.task]);

  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={props.isOpen}
    >
      <Pressable style={styles.container} onPress={closeModal}>
        <Pressable style={styles.modalContainer}>
          <AppText style={styles.title}>
            {props.isEdit ? appTexts.EDIT_TASK : appTexts.ADD_TASK}
          </AppText>
          <AppInput
            placeholder={appTexts.ENTER_TASK}
            value={taskField.value}
            onChangeText={taskField.onChangeText}
            error={taskField.error}
          />
          <View style={styles.buttonContainer}>
            <PrimaryButton
              buttonText={props.isEdit ? appTexts.UPDATE : appTexts.ADD}
              containerStyle={[styles.button]}
              onPress={onAddTaskPress}
            />
            <PrimaryButton
              buttonText={appTexts.CANCEL}
              onPress={closeModal}
              containerStyle={[styles.button, styles.cancelButton]}
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
    backgroundColor: appColors.app_00000080,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: appColors.white,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    backgroundColor: appColors.app_DC2828,
  },
});
