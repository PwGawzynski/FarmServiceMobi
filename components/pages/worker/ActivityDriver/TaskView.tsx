import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { YStack } from 'tamagui';
import { t } from 'i18next';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { Alert, AppState, Linking, Platform } from 'react-native';
import { ActivityAction, startActivityAsync } from 'expo-intent-launcher';
import { PermissionStatus } from 'expo-modules-core';
import { ScreenBase } from '../../owner/mobi/common/ScreenBase';
import { WorkerActivitiesDriverScreenProps } from '../../../../types/self/navigation/Worker/props/activities/WorkerActivitiesDriverProps';
import { ButtonTamagui } from '../../../atoms/ButtonTamagui';
import { WorkerModalContext } from '../../../../helepers/context/WorkerModalContext';
import { TaskWorkView } from '../../../molecules/TaskWorkView';
import { MapContainer } from '../../../molecules/MapContainer';
import { TaskInfoPanel } from '../../../atoms/TaskInfoPanel';
import { TranslationNames } from '../../../../locales/TranslationNames';
import { openTask, pauseTask } from '../../../../api/Task/Task';
import { TaskResponseBase } from '../../../../FarmServiceApiTypes/Task/Responses';
import { updateWorkerTasks } from '../../../../helepers/FetchingHelpers';
import PlayIcon from '../../../../assets/play.svg';
import ResumeIcon from '../../../../assets/refresh.svg';
import { HintCard } from '../../../atoms/HintCard';
import { useLocation } from '../../../../helepers/hooks/location';
import { TextWithLink } from '../../../atoms/TextWithLink';
import { performAction } from '../../../../helepers/taskSession/helpers';

export interface OpenedTaskSettingsI {
  isOpened: boolean;
  userLocationUpdateInterval?: number | 5000;
  userLocationFastestInterval?: number | 5000;
  followUserLocation?: boolean;
  setMapTo?: {
    latitude: number;
    longitude: number;
  };
}

const TRANSLATIONS = {
  screenTitle: t(
    TranslationNames.workerScreens.activityDriver.taskView.screenTitle,
  ),
  openButton: t(
    TranslationNames.workerScreens.activityDriver.taskView.openButton,
  ),
  resumeButton: t(
    TranslationNames.workerScreens.activityDriver.taskView.resumeButton,
  ),
  errorToastTitleOpen: t(
    TranslationNames.workerScreens.activityDriver.taskView.errorToastTitleOpen,
  ),
  errorToastTitleResume: t(
    TranslationNames.workerScreens.activityDriver.taskView
      .errorToastTitleResume,
  ),
  doneTaskHintCard: {
    header: t(
      TranslationNames.workerScreens.activityDriver.taskView.doneTaskHintCard
        .doneTaskHintCardTitle,
    ),
    text: t(
      TranslationNames.workerScreens.activityDriver.taskView.doneTaskHintCard
        .doneTaskHintCardDescription,
    ),
  },
  locationErrorHintCard: {
    hintCardTitle: t(
      TranslationNames.workerScreens.activityDriver.taskView
        .locationErrorHintCard.hintCardTitle,
    ),
    hintCardDescription: t(
      TranslationNames.workerScreens.activityDriver.taskView
        .locationErrorHintCard.hintCardDescription,
    ),
    enableLocationLink: t(
      TranslationNames.workerScreens.activityDriver.taskView
        .locationErrorHintCard.enableLocationLink,
    ),
  },
  enableLocationAlert: {
    title: t(
      TranslationNames.workerScreens.activityDriver.taskView.enableLocationAlert
        .title,
    ),
    description: t(
      TranslationNames.workerScreens.activityDriver.taskView.enableLocationAlert
        .description,
    ),
    okButton: t(
      TranslationNames.workerScreens.activityDriver.taskView.enableLocationAlert
        .okButton,
    ),
    cancelButton: t(
      TranslationNames.workerScreens.activityDriver.taskView.enableLocationAlert
        .cancelButton,
    ),
  },
  locationPrompt: {
    title: t(
      TranslationNames.workerScreens.activityDriver.taskView.locationPrompt
        .title,
    ),

    description: t(
      TranslationNames.workerScreens.activityDriver.taskView.locationPrompt
        .description,
    ),
  },
  closedByOwnerAlert: {
    title: t(
      TranslationNames.workerScreens.activityDriver.taskView.closedByOwnerAlert
        .title,
    ),
    description: t(
      TranslationNames.workerScreens.activityDriver.taskView.closedByOwnerAlert
        .description,
    ),
  },
};

export function TaskView({
  route: { params },
  navigation,
}: WorkerActivitiesDriverScreenProps<
  'taskView',
  'workerActivityDriver',
  'workerRootDriver'
>) {
  const [task, setTask] = useState<TaskResponseBase>(params.task);
  const modal = useContext(WorkerModalContext);
  const mapRef = useRef<MapView>(null);
  const [taskOpened, setTaskOpened] = useState<boolean>(false);
  const qc = useQueryClient();
  const unClosedSession = useMemo(() => {
    return task.sessions.find(s => !s.closedAt);
  }, [task.sessions]);
  const { data } = useQuery<TaskResponseBase[]>({
    queryKey: ['workerTasks'],
  });

  useEffect(() => {
    if (!data?.find(incomingTask => incomingTask.id === task.id)) {
      Alert.alert(
        TRANSLATIONS.closedByOwnerAlert.title,
        TRANSLATIONS.closedByOwnerAlert.description,
      );
      navigation.goBack();
    }
  }, [data]);

  const TaskWorkViewMemo = useMemo(
    () => (
      <TaskWorkView
        setTask={setTask}
        onClosePress={setTaskOpened}
        mapRef={mapRef}
        task={task}
        uncloseSession={unClosedSession}
      />
    ),
    [task, unClosedSession],
  );

  /**
   * ----------------------------------------LOCATION----------------------------------------
   * this section is responsible for handling location permissions and location updates
   */
  const { requestCurrentLocation, requestPermission, permissionStatus } =
    useLocation();
  useEffect(() => {
    if (permissionStatus && permissionStatus !== PermissionStatus.GRANTED) {
      Alert.alert(
        TRANSLATIONS.enableLocationAlert.title,
        TRANSLATIONS.enableLocationAlert.description,
        [
          {
            text: TRANSLATIONS.enableLocationAlert.okButton,
            onPress: () => {
              if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
              } else {
                startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS);
              }
            },
          },
          {
            text: TRANSLATIONS.enableLocationAlert.cancelButton,
            onPress: () => {
              setTaskOpened(false);
              modal?.setIsModalVisible(false);
              modal?.modalRef?.current?.close();
              modal?.modalRef?.current?.dismiss();
            },
            style: 'cancel',
          },
        ],
        { cancelable: true },
      );
    }
  }, [permissionStatus]);

  /** c
   * ----------------------------------------APP STATE----------------------------------------
   * On app state listener, due to the fact that user can go back from settings
   */
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        (async () => {
          await requestPermission();
        })();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  /**
   * ----------------------------------------MUTATIONS----------------------------------------
   */

  const { mutate, isPending } = useMutation({
    mutationKey: ['openTask', task.id],
    mutationFn: openTask,
    onSuccess: sth => {
      modal?.modalRef?.current?.present(TaskWorkViewMemo);
      setTaskOpened(true);
      modal?.setIsModalVisible(true);
      setTask(sth);
      updateWorkerTasks(qc, sth, task.id);
    },
    onError: e =>
      Toast.show({
        type: 'error',
        text1: TRANSLATIONS.errorToastTitleOpen,
        text2: e.message,
      }),
  });

  const { mutate: resume, isPending: isResumePending } = useMutation({
    mutationKey: ['resume', task.id],
    mutationFn: pauseTask,
    onSuccess: sth => {
      setTask(sth);
      modal?.modalRef?.current?.present(TaskWorkViewMemo);
      setTaskOpened(true);
      modal?.setIsModalVisible(true);
      updateWorkerTasks(qc, sth, task.id);
    },
    onError: e =>
      Toast.show({
        type: 'error',
        text1: TRANSLATIONS.errorToastTitleResume,
        text2: e.message,
      }),
  });

  /**
   * ----------------------------------------HANDLERS----------------------------------------
   */

  const handleOpen = () => {
    if (!task.lastPausedAt) {
      performAction(mutate, requestCurrentLocation, task.id, {
        header: TRANSLATIONS.locationPrompt.title,
        description: TRANSLATIONS.locationPrompt.description,
      });
    } else
      performAction(resume, requestCurrentLocation, task.id, {
        header: TRANSLATIONS.locationPrompt.title,
        description: TRANSLATIONS.locationPrompt.description,
      });
  };

  /**
   * ----------------------------------------MEMOS----------------------------------------
   */

  const hintCard = useMemo(() => {
    if (!(task.closedAt || task.isDone)) return undefined;
    return (
      <YStack mb="$4">
        <HintCard
          header={TRANSLATIONS.doneTaskHintCard.header}
          text={TRANSLATIONS.doneTaskHintCard.text}
        />
      </YStack>
    );
  }, [task.closedAt, task.isDone]);

  const locationDisabledHint = useMemo(() => {
    if (permissionStatus === PermissionStatus.GRANTED) return undefined;
    return (
      <YStack mb="$4">
        <HintCard
          type="error"
          header={TRANSLATIONS.locationErrorHintCard.hintCardTitle}
          text={TRANSLATIONS.locationErrorHintCard.hintCardDescription}
        >
          <TextWithLink
            linkText={TRANSLATIONS.locationErrorHintCard.enableLocationLink}
            onLinkPress={() => {
              if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
              } else {
                startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS);
              }
            }}
            abs="mt-0 justify-start"
          />
        </HintCard>
      </YStack>
    );
  }, [permissionStatus]);

  useEffect(() => {
    if (unClosedSession) {
      modal?.modalRef?.current?.present(TaskWorkViewMemo);
      setTaskOpened(true);
      modal?.setIsModalVisible(true);
    }
  }, [unClosedSession]);

  return (
    <ScreenBase name={TRANSLATIONS.screenTitle}>
      <YStack f={1} mt="$4">
        <MapContainer
          mapRef={mapRef}
          scaleUp={taskOpened}
          initialCords={{
            latitude: Number(task.field.address.latitude),
            longitude: Number(task.field.address.longitude),
          }}
          Marker={
            <Marker
              coordinate={{
                latitude: Number(task.field.address.latitude),
                longitude: Number(task.field.address.longitude),
              }}
              title={task.field.nameLabel}
            />
          }
        />
      </YStack>
      <TaskInfoPanel
        translateY={taskOpened}
        task={task}
        leadingChildren={locationDisabledHint || hintCard}
      />
      <YStack>
        {!task.isDone && permissionStatus === PermissionStatus.GRANTED && (
          <ButtonTamagui
            text={
              task.lastPausedAt
                ? TRANSLATIONS.resumeButton
                : TRANSLATIONS.openButton
            }
            isPending={isPending || isResumePending}
            icon={task.lastPausedAt ? <ResumeIcon /> : <PlayIcon />}
            buttonProps={{
              mb: '$4',
              onPress: handleOpen,
            }}
          />
        )}
      </YStack>
    </ScreenBase>
  );
}
