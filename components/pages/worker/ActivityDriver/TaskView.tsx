import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { YStack } from 'tamagui';
import { t } from 'i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
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
import { GuideCard } from '../../../atoms/GuideCard';

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
};

export function TaskView({
  route: { params },
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
  const unClosedSession = useMemo(
    () => task.sessions.find(s => !s.closedAt),
    [task.sessions],
  );

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

  const hintCard = useMemo(() => {
    console.log(task.closedAt, task.isDone);
    if (!(task.closedAt || task.isDone)) return undefined;
    return (
      <YStack mb="$4">
        <GuideCard
          header={TRANSLATIONS.doneTaskHintCard.header}
          text={TRANSLATIONS.doneTaskHintCard.text}
        />
      </YStack>
    );
  }, [task.closedAt, task.isDone]);

  useEffect(() => {
    if (unClosedSession) {
      console.log(unClosedSession, 'unclosed');
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
        leadingChildren={hintCard}
      />
      <YStack>
        {!task.isDone && (
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
              onPress: () => {
                if (!task.lastPausedAt) mutate(task.id);
                else resume(task.id);
              },
            }}
          />
        )}
      </YStack>
    </ScreenBase>
  );
}
