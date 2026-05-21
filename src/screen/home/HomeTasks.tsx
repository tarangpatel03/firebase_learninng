import { useEffect, useMemo, useState } from 'react';
import {
  AddTaskModal,
  AppScreen,
  AppText,
  LogoutConfirmationModal,
  TaskFilterModal,
  TaskFilterType,
} from '@/components';
import { RootStackParamList } from '@/types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useUserStore } from '@/store/useUserStore';
import firestore from '@react-native-firebase/firestore';
import { firebaseCollections } from '@/configs';
import { appTexts } from '@/constants';
import { appAssets } from '@/assets';
import { appColors } from '@/theme';
import { TaskComponentProps, TaskDocument } from '@/types/task.type';
import { deleteTask, updateTask } from '@/services';
import { useAuth } from '@/hooks';
import FastImage from '@d11/react-native-fast-image';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({}: Props) => {
  const uid = useUserStore(state => state.uid);
  const [tasks, setTasks] = useState<TaskDocument[]>([]);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<TaskFilterType>('all');
  const { signOut } = useAuth();

  useEffect(() => {
    if (!uid) {
      setTasks([]);
      return;
    }

    const unsubscribe = firestore()
      .collection(firebaseCollections.USERS)
      .doc(uid)
      .collection(firebaseCollections.TASKS)
      .onSnapshot(snapShot => {
        const list = snapShot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            created_at: data.created_at,
            task: data.task,
            is_completed: data.is_completed,
          } as TaskDocument;
        });

        const completedTasks = list.filter(task => task.is_completed);
        const notCompletedTasks = list.filter(task => !task.is_completed);

        const sortedList = [...notCompletedTasks, ...completedTasks];

        setTasks(sortedList);
      });

    return unsubscribe;
  }, [uid]);

  const onDeletePress = (id: string) => {
    deleteTask(uid, id);
  };

  const onEditPress = (id: string) => {
    setSelectedTask(id);
    setIsAddTaskModalOpen(true);
  };

  const onCloseModal = () => {
    setIsAddTaskModalOpen(false);
    console.log('Selected Task: ', selectedTask);

    setSelectedTask(null);
  };

  const onLogoutConfirm = async () => {
    setIsLogoutModalOpen(false);
    await signOut();
  };

  const filteredTasks = useMemo(() => {
    if (selectedFilter === 'completed') {
      return tasks.filter(task => task.is_completed);
    }

    if (selectedFilter === 'not_completed') {
      return tasks.filter(task => !task.is_completed);
    }

    return tasks;
  }, [selectedFilter, tasks]);

  const renderItem = ({ item }: { item: TaskDocument }) => {
    return (
      <TaskComponent
        uid={uid}
        item={item}
        onDeletePress={onDeletePress}
        onEditPress={onEditPress}
      />
    );
  };

  return (
    <AppScreen>
      <AddTaskModal
        uid={uid}
        isEdit={!!selectedTask}
        task={
          selectedTask ? tasks.find(task => task.id === selectedTask) : null
        }
        isOpen={isAddTaskModalOpen}
        closeModal={onCloseModal}
      />
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        closeModal={setIsLogoutModalOpen.bind(null, false)}
        onConfirm={onLogoutConfirm}
      />
      <TaskFilterModal
        isOpen={isFilterModalOpen}
        selectedFilter={selectedFilter}
        closeModal={setIsFilterModalOpen.bind(null, false)}
        onSelectFilter={setSelectedFilter}
      />
      <View style={styles.container}>
        <View style={styles.taskContainer}>
          <AppText style={styles.title}>{appTexts.YOUR_TASKS}</AppText>
          <View style={styles.taskInnerContainer}>
            <Pressable onPress={setIsFilterModalOpen.bind(null, true)}>
              <FastImage
                source={appAssets.icons.ic_filter}
                style={styles.icons}
              />
            </Pressable>
            <Pressable onPress={setIsAddTaskModalOpen.bind(null, true)}>
              <FastImage source={appAssets.icons.ic_add} style={styles.icons} />
            </Pressable>
            <Pressable onPress={setIsLogoutModalOpen.bind(null, true)}>
              <FastImage
                source={appAssets.icons.ic_logout}
                style={styles.icons}
              />
            </Pressable>
          </View>
        </View>
        <FlatList
          data={filteredTasks}
          renderItem={renderItem}
          ItemSeparatorComponent={<View style={styles.listSeparator} />}
          keyExtractor={item => item.id}
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    paddingTop: 50,
    paddingHorizontal: 24,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icons: {
    width: 20,
    height: 20,
  },
  tick: {
    width: 15,
    height: 12,
  },
  todoBox: {
    width: 26,
    height: 26,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: appColors.app_4D81E7,
  },
  listSeparator: {
    height: 1,
    marginVertical: 12,
    backgroundColor: appColors.separator,
  },
  completedTask: {
    fontSize: 14,
    color: appColors.separator,
    textDecorationLine: 'line-through',
  },
  task: {
    fontSize: 14,
    color: appColors.primaryText,
  },
});

const TaskComponent = ({
  item,
  uid,
  onDeletePress,
  onEditPress,
}: TaskComponentProps) => {
  return (
    <View style={styles.taskContainer}>
      <Pressable
        style={styles.taskInnerContainer}
        onPress={() => updateTask(uid, item.id, item.is_completed)}
      >
        <View
          style={[
            styles.todoBox,
            item.is_completed && { backgroundColor: appColors.app_4D81E7 },
          ]}
        >
          {item.is_completed && (
            <FastImage
              source={appAssets.icons.ic_check}
              tintColor={appColors.white}
              style={styles.tick}
            />
          )}
        </View>
        <AppText style={item.is_completed ? styles.completedTask : styles.task}>
          {item.task}
        </AppText>
      </Pressable>
      <View style={styles.taskInnerContainer}>
        <Pressable onPress={onEditPress.bind(null, item.id)}>
          <FastImage
            source={appAssets.icons.ic_edit}
            tintColor={appColors.app_4D81E7}
            style={styles.icons}
          />
        </Pressable>
        <Pressable onPress={onDeletePress.bind(null, item.id)}>
          <FastImage
            source={appAssets.icons.ic_delete}
            tintColor={appColors.app_DC2828}
            style={styles.icons}
          />
        </Pressable>
      </View>
    </View>
  );
};
