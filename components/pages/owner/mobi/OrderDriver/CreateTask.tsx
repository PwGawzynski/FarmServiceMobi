import { useEffect, useMemo, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SizableText, YStack } from 'tamagui';
import { t } from 'i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { ScreenBase } from '../common/ScreenBase';
import { OrdersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDriverProps';
import { HintCard, GuideCardElement } from '../../../../atoms/HintCard';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { FieldResponseBase } from '../../../../../FarmServiceApiTypes/Field/Ressponses';
import { WorkerResponseBase } from '../../../../../FarmServiceApiTypes/Worker/Responses';
import { MachineResponseBase } from '../../../../../FarmServiceApiTypes/Machine/Responses';
import List, { ListRef } from '../../../../organisms/List';
import { Selector } from '../../../../molecules/Selector';
import { TaskType } from '../../../../../FarmServiceApiTypes/Task/Enums';
import { findEnumVal, makeArray } from '../../../../../helepers/MakeArray';
import { EntityAsACard } from '../../../../molecules/EntityAsACard';
import { FieldSelector } from '../../../../organisms/FieldSelector';
import { WorkerSelector } from '../../../../organisms/WorkerSelector';
import { MachineSelector } from '../../../../organisms/MachineSelector';
import { createTask } from '../../../../../api/Task/Task';
import { CreateTaskReqI } from '../../../../../FarmServiceApiTypes/Task/Requests';
import { OrderResponseBase } from '../../../../../FarmServiceApiTypes/Order/Ressponses';
import { TaskResponseBase } from '../../../../../FarmServiceApiTypes/Task/Responses';
import { EmptyListItemCreator } from '../../../../atoms/EmptyListItemCreator';

enum ScreenState {
  SelectField,
  SelectWorker,
  SelectMachine,
  AllSelected,
}

type HintCardObject = {
  header: string;
  text: string;
};

type TaskData = {
  fields: FieldResponseBase[] | undefined;
  worker: WorkerResponseBase | undefined;
  machines: MachineResponseBase | undefined;
  type: TaskType;
};

type TaskListItem = {
  field: string;
  type: string;
  area: number;
};

const TRANSLATIONS = {
  screenTitle: t(TranslationNames.screens.orderDriver.createTask.screenTitle),
  screenSummaryTitle: t(
    TranslationNames.screens.orderDriver.createTask.screenSummaryTitle,
  ),
  submitButton: t(TranslationNames.screens.orderDriver.createTask.submitButton),
  ha: t(TranslationNames.screens.orderDriver.createTask.ha),
  SELECT_FIELDS: {
    next_step_button: t(
      TranslationNames.screens.orderDriver.createTask.selectFields
        .stepSelectFields,
    ),
    hintHeader: t(
      TranslationNames.screens.orderDriver.createTask.selectFields.hintHeader,
    ),
    hintText: t(
      TranslationNames.screens.orderDriver.createTask.selectFields
        .hintDescription,
    ),
  },
  SELECT_WORKER: {
    next_step_button: t(
      TranslationNames.screens.orderDriver.createTask.selectWorkers
        .stepSelectWorkers,
    ),
    hintHeader: t(
      TranslationNames.screens.orderDriver.createTask.selectWorkers.hintHeader,
    ),
    hintText: t(
      TranslationNames.screens.orderDriver.createTask.selectWorkers
        .hintDescription,
    ),
  },
  SELECT_MACHINE: {
    next_step_button: t(
      TranslationNames.screens.orderDriver.createTask.selectMachines
        .stepSelectMachine,
    ),
    hintHeader: t(
      TranslationNames.screens.orderDriver.createTask.selectMachines.hintHeader,
    ),
    hintText: t(
      TranslationNames.screens.orderDriver.createTask.selectMachines
        .hintDescription,
    ),
  },
  TASK_SUMMATION: {
    SUMMARY_CARD: {
      fields: t(
        TranslationNames.screens.orderDriver.createTask.summary.summaryCard
          .fields,
      ),
      worker: t(
        TranslationNames.screens.orderDriver.createTask.summary.summaryCard
          .workers,
      ),
      machine: t(
        TranslationNames.screens.orderDriver.createTask.summary.summaryCard
          .machines,
      ),
      type: t(
        TranslationNames.screens.orderDriver.createTask.summary.summaryCard
          .type,
      ),
      totalArea: t(
        TranslationNames.screens.orderDriver.createTask.summary.summaryCard
          .totalArea,
      ),
    },
    TYPE_SELECTOR: {
      label: t(
        TranslationNames.screens.orderDriver.createTask.summary.typeSelector
          .label,
      ),
      description: t(
        TranslationNames.screens.orderDriver.createTask.summary.typeSelector
          .description,
      ),
      creatingTasks: t(
        TranslationNames.screens.orderDriver.createTask.summary.typeSelector
          .creatingTasks,
      ),
    },
  },
  LIST_EMPTY: {
    fieldList: t(
      TranslationNames.screens.orderDriver.createTask.fieldSelectorEmptyList,
    ),
    workerList: t(
      TranslationNames.screens.orderDriver.createTask.workerSelectorEmptyList,
    ),
    machineList: t(
      TranslationNames.screens.orderDriver.createTask.machineSelectorEmptyList,
    ),
  },
  TOAST: {
    error: {
      title: t(TranslationNames.components.toast.cantCreateTask),
      message: t(TranslationNames.components.toast.cantCreateTaskDescription),
    },
  },
};

const hintCard: Array<HintCardObject> = [
  {
    header: TRANSLATIONS.SELECT_FIELDS.hintHeader,
    text: TRANSLATIONS.SELECT_FIELDS.hintText,
  },
  {
    header: TRANSLATIONS.SELECT_WORKER.next_step_button,
    text: TRANSLATIONS.SELECT_WORKER.hintText,
  },
  {
    header: TRANSLATIONS.SELECT_MACHINE.hintHeader,
    text: TRANSLATIONS.SELECT_MACHINE.hintText,
  },
];

const beTask = (
  taskData: TaskData,
  order: OrderResponseBase,
): CreateTaskReqI[] | undefined =>
  taskData.fields?.map(
    field =>
      ({
        order: order.id,
        field: field.id,
        worker: taskData.worker?.id,
        machine: taskData.machines?.id,
        type: taskData.type,
      }) as CreateTaskReqI,
  );

const beTaskListItem = (taskData: TaskData) =>
  taskData.fields?.map(
    f =>
      ({
        field: f.nameLabel,
        type: TaskType[taskData.type],
        area: f.area,
      }) as TaskListItem,
  );

export function CreateTask({
  route: { params },
  navigation,
}: OrdersDriverScreenProps<'createTask', 'ordersDriver', 'ownerRootDriver'>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { order, client } = params;

  const modalRef = useRef<BottomSheetModal>(null);
  const fieldListRef = useRef<ListRef<FieldResponseBase>>(null);
  const workerListRef = useRef<ListRef<WorkerResponseBase>>(null);
  const machineListRef = useRef<ListRef<MachineResponseBase>>(null);
  const [taskData, setTaskData] = useState<TaskData>({
    fields: undefined,
    worker: undefined,
    machines: undefined,
    type: TaskType.Harvesting,
  });
  const [screenState, setScreenState] = useState(ScreenState.SelectField);

  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationKey: ['createTask'],
    mutationFn: createTask,
    onSuccess: responseData =>
      queryClient.setQueryData(
        ['orderTasks', order.id],
        (old: Array<TaskResponseBase>) => {
          return responseData ? [...old, ...responseData] : responseData;
        },
      ),
  });
  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('orderDetails', { order });
    }
    if (error) {
      Toast.show({
        type: 'error',
        text1: TRANSLATIONS.TOAST.error.title,
        text2: error.message || TRANSLATIONS.TOAST.error.message,
      });
    }
  }, [isSuccess, error]);

  const handleSubmit = () => {
    if (taskData.fields) {
      const tasks = beTask(taskData, order);
      if (tasks)
        mutate({
          tasks,
        });
    }
  };

  const FieldSelectorEmpty = useMemo(
    () => (
      <EmptyListItemCreator
        onCreate={() =>
          navigation.navigate('addField', {
            client,
            goBack: true,
          })
        }
        infoText={TRANSLATIONS.LIST_EMPTY.fieldList}
      />
    ),
    [],
  );
  const WorkerSelectorEmpty = useMemo(
    () => (
      <EmptyListItemCreator
        onCreate={() =>
          navigation.navigate('workersDriver', {
            screen: 'workersDesktopRoot',
            params: {
              screen: 'addWorker',
              params: {
                goBack: true,
              },
            },
          })
        }
        infoText={TRANSLATIONS.LIST_EMPTY.workerList}
      />
    ),
    [],
  );
  const MachineSelectorEmpty = useMemo(
    () => (
      <EmptyListItemCreator
        onCreate={() =>
          navigation.navigate('machinesDriver', {
            screen: 'machinesDesktopRoot',
            params: {
              screen: 'addMachine',
              params: { machine: undefined, goBack: true },
            },
          })
        }
        infoText={TRANSLATIONS.LIST_EMPTY.machineList}
      />
    ),
    [],
  );
  return (
    <ScreenBase
      name={
        screenState === ScreenState.AllSelected
          ? TRANSLATIONS.screenTitle
          : TRANSLATIONS.screenSummaryTitle
      }
      bottomSheetsProps={{
        modalRef,
        snapPoints: ['50%', '70%'],
      }}
    >
      <YStack f={1} className="mt-2">
        <YStack className="mt-2">
          {screenState !== ScreenState.AllSelected && (
            <HintCard
              header={hintCard[screenState].header}
              text={hintCard[screenState].text}
            >
              <GuideCardElement
                isCurrent={screenState === ScreenState.SelectField}
                isDone={!!taskData?.fields?.length}
                text={TRANSLATIONS.SELECT_FIELDS.next_step_button}
              />
              <GuideCardElement
                isCurrent={screenState === ScreenState.SelectWorker}
                isDone={!!taskData?.worker}
                text={TRANSLATIONS.SELECT_WORKER.next_step_button}
              />
              <GuideCardElement
                text={TRANSLATIONS.SELECT_MACHINE.next_step_button}
              />
            </HintCard>
          )}
        </YStack>
        {screenState === ScreenState.SelectField && (
          <FieldSelector
            ListEmptyComponent={FieldSelectorEmpty}
            client={client}
            modalRef={modalRef}
            onSetAction={() => {
              setTaskData(p => ({
                ...p,
                fields: fieldListRef.current?.items,
                worker: undefined,
                machines: undefined,
              }));
              setScreenState(ScreenState.SelectWorker);
            }}
            fieldListRef={fieldListRef}
          />
        )}
        {screenState === ScreenState.SelectWorker && (
          <WorkerSelector
            ListEmptyComponent={WorkerSelectorEmpty}
            modalRef={modalRef}
            workerListRef={workerListRef}
            maxSelectedItems={1}
            onSetAction={() => {
              setTaskData(p => ({
                ...p,
                fields: p?.fields,
                worker: workerListRef.current?.items[0],
                machines: undefined,
              }));
              setScreenState(ScreenState.SelectMachine);
            }}
          />
        )}
        {screenState === ScreenState.SelectMachine && (
          <MachineSelector
            ListEmptyComponent={MachineSelectorEmpty}
            modalRef={modalRef}
            machineListRef={machineListRef}
            maxSelectedItems={1}
            onSetAction={() => {
              setTaskData(p => ({
                ...p,
                fields: p?.fields,
                worker: p?.worker,
                machines: machineListRef.current?.items[0],
              }));
              setScreenState(ScreenState.AllSelected);
            }}
          />
        )}
        {screenState === ScreenState.AllSelected && (
          <YStack f={1} jc="space-between">
            <YStack mb="$4">
              <EntityAsACard
                data={{
                  fields: taskData.fields?.length.toString(),
                  worker: `${taskData.worker?.personalData.name} ${taskData.worker?.personalData.surname}`,
                  machine: taskData.machines?.name,
                  type: TaskType[taskData.type].toUpperCase(),
                  totalArea: `${taskData.fields
                    ?.reduce(
                      (acc, field) => Number(acc) + Number(field.area),
                      0,
                    )
                    .toFixed(2)
                    .toString()} ${TRANSLATIONS.ha}`,
                }}
                names={{
                  fields: TRANSLATIONS.TASK_SUMMATION.SUMMARY_CARD.fields,
                  worker: TRANSLATIONS.TASK_SUMMATION.SUMMARY_CARD.worker,
                  machine: TRANSLATIONS.TASK_SUMMATION.SUMMARY_CARD.machine,
                  type: TRANSLATIONS.TASK_SUMMATION.SUMMARY_CARD.type,
                  totalArea: TRANSLATIONS.TASK_SUMMATION.SUMMARY_CARD.totalArea,
                }}
              />
            </YStack>
            <Selector
              itemListLabel={TRANSLATIONS.TASK_SUMMATION.TYPE_SELECTOR.label}
              description={
                TRANSLATIONS.TASK_SUMMATION.TYPE_SELECTOR.description
              }
              onValueChange={v =>
                setTaskData(p => ({ ...p, type: findEnumVal(TaskType, v) }))
              }
              value={
                taskData.type !== undefined
                  ? TaskType[taskData.type].toLowerCase()
                  : ''
              }
              items={makeArray(TaskType).map(e => ({ name: e }))}
            />
            <SizableText className="font-bold uppercase text-xl mt-4">
              {TRANSLATIONS.TASK_SUMMATION.TYPE_SELECTOR.creatingTasks}
            </SizableText>
            <YStack f={1}>
              <List
                data={beTaskListItem(taskData)}
                listStyleSettings={item => ({
                  header: item.field,
                  bottomRightText: `${
                    item.type !== undefined ? item.type : ''
                  } ${Number(item.area)?.toFixed(2)} ${TRANSLATIONS.ha}`,
                  alignment: 'left',
                })}
                isSelectable={false}
                isFetching={false}
                modalRef={modalRef}
                cName="mt-0"
              />
            </YStack>
            <ButtonTamagui
              text={TRANSLATIONS.submitButton}
              isPending={isPending}
              buttonProps={{
                onPress: handleSubmit,
              }}
            />
          </YStack>
        )}
      </YStack>
    </ScreenBase>
  );
}
