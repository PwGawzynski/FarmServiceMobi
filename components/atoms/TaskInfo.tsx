import { Card, ScrollView, SizableText, XStack, YGroup, YStack } from 'tamagui';
import { t } from 'i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Alert } from 'react-native';
import { TaskResponseBase } from '../../FarmServiceApiTypes/Task/Responses';
import { ButtonTamagui } from './ButtonTamagui';
import { Colors } from '../../settings/styles/colors';
import { KeyValuePair } from './KeyValuePair';
import { TaskType } from '../../FarmServiceApiTypes/Task/Enums';
import { TranslationNames } from '../../locales/TranslationNames';
import TrashIco from '../../assets/trash.svg';
import { closeTaskByOwner, deleteTask } from '../../api/Task/Task';
import { OrderResponseBase } from '../../FarmServiceApiTypes/Order/Ressponses';
import { TaskSessionItem } from './TaskSessionItem';
import { TaskSessionManagement } from '../molecules/TaskSessionManagement';
import { TaskSessionResponseBase } from '../../FarmServiceApiTypes/TaskSession/Responses';
import CheckIco from '../../assets/check.svg';

export type Props = {
  task: TaskResponseBase;
  onDeleteProcessed: () => void;
  order: OrderResponseBase;
  modalRef?: React.RefObject<BottomSheetModal>;
};

const TRANSLATIONS = {
  onDeleteAlertTitle: t(
    TranslationNames.components.taskInfoCard.onDeleteAlertTitle,
  ),
  onDeleteAlertDescription: t(
    TranslationNames.components.taskInfoCard.onDeleteAlertDescription,
  ),
  alertOkButton: t(TranslationNames.components.alert.okButton),
  alertCancelButton: t(TranslationNames.components.alert.cancelButton),
};

const TaskInfoCardNames = {
  type: t(TranslationNames.components.taskInfoCard.type),
  worker: t(TranslationNames.components.taskInfoCard.worker),
  machine: t(TranslationNames.components.taskInfoCard.machine),
  createdAt: t(TranslationNames.components.taskInfoCard.createdAt),
  openedAt: t(TranslationNames.components.taskInfoCard.openedAt),
  closedAt: t(TranslationNames.components.taskInfoCard.closedAt),
  fieldArea: t(TranslationNames.components.taskInfoCard.fieldArea),
  deleteButton: t(TranslationNames.components.taskInfoCard.deleteButton),
  closeTaskButton: t(TranslationNames.components.taskInfoCard.closeTaskButton),
};

export function TaskInfo({ task, onDeleteProcessed, order, modalRef }: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ['delTask', order.id],
    mutationFn: deleteTask,
    onSuccess: (d, v) => {
      onDeleteProcessed();
      return queryClient.setQueryData(
        ['orderTasks', order.id],
        (old: TaskResponseBase[]) =>
          old?.filter(storedTask => storedTask.id !== v),
      );
    },
  });

  const { mutate: close, isPending: isClosePending } = useMutation({
    mutationKey: ['closeTask', task.id],
    mutationFn: closeTaskByOwner,
    onSuccess: (d, v) => {
      onDeleteProcessed();
      return queryClient.setQueryData(
        ['orderTasks', order.id],
        (old: TaskResponseBase[]) =>
          old?.filter(storedTask => storedTask.id !== v).push(d),
      );
    },
  });

  const [sessionView, setSessionView] = useState<
    TaskSessionResponseBase | undefined
  >(undefined);

  const sessions = useMemo(
    () =>
      task.sessions
        .sort((a, b) =>
          new Date(a.openedAt).getTime() < new Date(b.openedAt).getTime()
            ? 1
            : -1,
        )
        .map(session => (
          <TaskSessionItem
            onPress={() => {
              modalRef?.current?.collapse();
              setSessionView(session);
            }}
            session={session}
            key={Math.random()}
          />
        )),
    [task.sessions],
  );

  const handleOnDelete = () => {
    Alert.alert(
      TRANSLATIONS.onDeleteAlertTitle,
      TRANSLATIONS.onDeleteAlertDescription,
      [
        {
          text: TRANSLATIONS.alertCancelButton,
          style: 'cancel',
        },
        {
          text: TRANSLATIONS.alertOkButton,
          onPress: () => {
            mutate(task.id);
          },
        },
      ],
    );
  };

  const handleOnClose = () => {
    close(task.id);
  };

  return sessionView ? (
    <TaskSessionManagement
      onBackToTask={() => {
        modalRef?.current?.expand();
        setSessionView(undefined);
      }}
      session={sessionView}
    />
  ) : (
    <YStack f={1} maxHeight="90%" p="$3">
      <YStack>
        <XStack justifyContent="space-between">
          <SizableText
            color="$color4"
            className="text-xl uppercase font-bold mb-2"
          >
            {task.field.nameLabel}
          </SizableText>
          <ButtonTamagui
            isPending={isPending}
            icon={<TrashIco />}
            bgColor={Colors.ERROR_RED}
            text={TaskInfoCardNames.deleteButton}
            buttonProps={{ onPress: handleOnDelete, size: '$2' }}
          />
          {!task.isDone && task.openedAt && (
            <ButtonTamagui
              isPending={isClosePending}
              icon={<CheckIco />}
              bgColor="$color4"
              text={TaskInfoCardNames.closeTaskButton}
              buttonProps={{ onPress: handleOnClose, size: '$2' }}
            />
          )}
        </XStack>
        <Card bordered mt="$4" p="$2">
          <KeyValuePair
            name={TaskInfoCardNames.type}
            value={TaskType[task.type]}
          />
          <KeyValuePair
            name={TaskInfoCardNames.worker}
            value={`${task.worker.personalData.name} ${task.worker.personalData.surname}`}
          />
          <KeyValuePair
            name={TaskInfoCardNames.machine}
            value={task.machine.name}
          />
          <KeyValuePair
            name={TaskInfoCardNames.createdAt}
            value={new Date(task.createdAt).toLocaleDateString()}
          />
          {task.openedAt && (
            <KeyValuePair
              name={TaskInfoCardNames.openedAt}
              value={new Date(task.openedAt).toLocaleDateString()}
            />
          )}
          {task.closedAt && (
            <KeyValuePair
              name={TaskInfoCardNames.closedAt}
              value={new Date(task.closedAt).toLocaleDateString()}
            />
          )}
          <KeyValuePair
            name={TaskInfoCardNames.fieldArea}
            value={`${Number(task.field.area).toFixed(2).toString()} ${t(
              TranslationNames.components.taskInfoCard.ha,
            )}`}
          />
        </Card>
      </YStack>
      <YStack mt="$4" maxHeight="50%">
        <Card bordered p="$2">
          <SizableText fontSize="$7" className="uppercase font-bold">
            Sessions
          </SizableText>
          <ScrollView>
            <YGroup>{sessions}</YGroup>
          </ScrollView>
        </Card>
      </YStack>
    </YStack>
  );
}
