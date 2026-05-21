import { firebaseCollections } from '@/configs';
import { appTexts } from '@/constants';
import { showSuccessToast } from '@/lib/toast';
import firestore from '@react-native-firebase/firestore';

export const addTask = async (uid: string, task: string) => {
  try {
    await firestore()
      .collection(firebaseCollections.USERS)
      .doc(uid)
      .collection(firebaseCollections.TASKS)
      .add({
        task,
        is_completed: false,
        created_at: new Date(),
      });
    showSuccessToast(appTexts.TASK_ADDED);
  } catch (e) {
    console.log(e);
  }
};

export const updateTask = async (
  uid: string,
  taskId: string,
  isCompleted: boolean,
) => {
  try {
    await firestore()
      .collection(firebaseCollections.USERS)
      .doc(uid)
      .collection(firebaseCollections.TASKS)
      .doc(taskId)
      .update({
        is_completed: !isCompleted,
      });
  } catch (e) {
    console.log(e);
  }
};

export const editTask = async (
  uid: string,
  taskId: string,
  task: string,
  isCompleted: boolean,
) => {
  try {
    await firestore()
      .collection(firebaseCollections.USERS)
      .doc(uid)
      .collection(firebaseCollections.TASKS)
      .doc(taskId)
      .update({
        task: task,
        is_completed: isCompleted,
      });
    showSuccessToast(appTexts.TASK_UPDATED);
  } catch (e) {
    console.log(e);
  }
};

export const deleteTask = async (uid: string, taskId: string) => {
  try {
    await firestore()
      .collection(firebaseCollections.USERS)
      .doc(uid)
      .collection(firebaseCollections.TASKS)
      .doc(taskId)
      .delete();
    showSuccessToast(appTexts.TASK_DELETED);
  } catch (e) {
    console.log(e);
  }
};
