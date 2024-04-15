import { SizableText, XStack, YStack } from 'tamagui';
import { t } from 'i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskResponseBase } from '../../FarmServiceApiTypes/Task/Responses';
import { ButtonTamagui } from './ButtonTamagui';
import { Colors } from '../../settings/styles/colors';
import { KeyValuePair } from './KeyValuePair';
import { TaskType } from '../../FarmServiceApiTypes/Task/Enums';
import { TranslationNames } from '../../locales/TranslationNames';
import TrashIco from '../../assets/trash.svg';
import { deleteTask } from '../../api/Task/Task';
import { OrderResponseBase } from '../../FarmServiceApiTypes/Order/Ressponses';

export type Props = {
  task: TaskResponseBase;
  onDeleteProcessed: () => void;
  order: OrderResponseBase;
};

const TaskInfoCardNames = {
  type: t(TranslationNames.components.taskInfoCard.type),
  worker: t(TranslationNames.components.taskInfoCard.worker),
  machine: t(TranslationNames.components.taskInfoCard.machine),
  createdAt: t(TranslationNames.components.taskInfoCard.createdAt),
  openedAt: t(TranslationNames.components.taskInfoCard.openedAt),
  closedAt: t(TranslationNames.components.taskInfoCard.closedAt),
  fieldArea: t(TranslationNames.components.taskInfoCard.fieldArea),
  deleteButton: t(
    TranslationNames.screens.machineDriver.machineDetailsScreen.deleteButton,
  ),
};

export function TaskInfo({ task, onDeleteProcessed, order }: Props) {
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

  const handleOnDelete = () => {
    mutate(task.id);
  };
  return (
    <YStack f={1} p="$3">
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
      </XStack>
      <KeyValuePair name={TaskInfoCardNames.type} value={TaskType[task.type]} />
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
    </YStack>
  );
}
