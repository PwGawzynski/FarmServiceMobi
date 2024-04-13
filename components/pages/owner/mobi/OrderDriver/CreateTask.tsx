import { ForwardedRef, RefObject, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { YStack } from 'tamagui';
import { t } from 'i18next';
import { useQuery } from '@tanstack/react-query';
import { ScreenBase } from '../common/ScreenBase';
import { OrdersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDriverProps';
import { GuideCard, GuideCardElement } from '../../../../atoms/GuideCard';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import { ClientResponseBase } from '../../../../../FarmServiceApiTypes/Clients/Responses';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { FieldResponseBase } from '../../../../../FarmServiceApiTypes/Field/Ressponses';
import { WorkerResponseBase } from '../../../../../FarmServiceApiTypes/Worker/Responses';
import { MachineResponseBase } from '../../../../../FarmServiceApiTypes/Machine/Responses';
import { getClientFields } from '../../../../../api/clients/Client';
import { EXPO_PUBLIC_QUERY_STALE_TIME } from '../../../../../settings/query/querySettings';
import {
  clientFieldsFilter,
  machineFilter,
  searchEngineNameSurnameFilter,
} from '../../../../../helepers/filterFunctions';
import List, { ListRef } from '../../../../organisms/List';
import { createFieldBottomSign } from '../ClientsDriver/clientFields';
import { Status } from '../../../../../FarmServiceApiTypes/Worker/Enums';
import { allWorkers } from '../../../../../api/worker/Worker';
import { getAllMachines } from '../../../../../api/Machine/Machine';

enum ScreenState {
  SelectField,
  SelectWorker,
  SelectMachine,
  AllSelected,
}

interface SelectFieldsProps {
  client: ClientResponseBase;
  modalRef: RefObject<BottomSheetModal>;
  onSetAction: () => void;
  fieldListRef: ForwardedRef<ListRef<FieldResponseBase>>;
}

interface SelectWorkerProps {
  modalRef: RefObject<BottomSheetModal>;
  onSetAction: () => void;
  workerListRef: ForwardedRef<ListRef<WorkerResponseBase>>;
}
interface SelectMachineProps {
  modalRef: RefObject<BottomSheetModal>;
  onSetAction: () => void;
  machineListRef: ForwardedRef<ListRef<MachineResponseBase>>;
}

type HintCardObject = {
  header: string;
  text: string;
};

type TaskData = {
  fields: FieldResponseBase[] | undefined;
  worker: WorkerResponseBase | undefined;
  machines: MachineResponseBase | undefined;
};

const TRANSLATIONS = {
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
      TranslationNames.screens.orderDriver.createTask.selectFields
        .stepSelectFields,
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
      TranslationNames.screens.orderDriver.createTask.selectFields
        .stepSelectFields,
    ),
    hintHeader: t(
      TranslationNames.screens.orderDriver.createTask.selectMachines.hintHeader,
    ),
    hintText: t(
      TranslationNames.screens.orderDriver.createTask.selectMachines
        .hintDescription,
    ),
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

function FieldSelector({
  client,
  modalRef,
  onSetAction,
  fieldListRef,
}: SelectFieldsProps) {
  const [canSubmit, setCanSubmit] = useState(false);
  const { data, isError, isFetching } = useQuery({
    queryKey: ['clientFields', client.id],
    queryFn: keys => getClientFields(keys.queryKey[1] as string),
    staleTime: EXPO_PUBLIC_QUERY_STALE_TIME,
  });
  return (
    <YStack f={1}>
      <List<FieldResponseBase>
        isSelectable
        triggerOnSelectedChange={isEmpty => {
          setCanSubmit(!isEmpty);
        }}
        ref={fieldListRef}
        isFetching={isFetching}
        isError={isError}
        data={data}
        modalRef={modalRef}
        listStyleSettings={item => ({
          header: item.nameLabel,
          bottomRightText: createFieldBottomSign(item),
          alignment: 'left',
          infoIco: true,
        })}
        filterFunction={clientFieldsFilter}
        searchEnginePlaceholder="Search Field"
      />
      {canSubmit && (
        <ButtonTamagui
          text={TRANSLATIONS.SELECT_FIELDS.next_step_button}
          buttonProps={{
            onPress: () => onSetAction(),
          }}
        />
      )}
    </YStack>
  );
}

function WorkerSelector({
  modalRef,
  onSetAction,
  workerListRef,
}: SelectWorkerProps) {
  const [canSubmit, setCanSubmit] = useState(false);
  const { data, isFetching, isError } = useQuery({
    queryKey: ['workers'],
    queryFn: allWorkers,
    staleTime: EXPO_PUBLIC_QUERY_STALE_TIME,
    gcTime: EXPO_PUBLIC_QUERY_STALE_TIME,
  });
  return (
    <YStack f={1}>
      <List<WorkerResponseBase>
        isSelectable
        triggerOnSelectedChange={isEmpty => {
          setCanSubmit(!isEmpty);
        }}
        ref={workerListRef}
        isFetching={isFetching}
        isError={isError}
        data={data}
        modalRef={modalRef}
        listStyleSettings={item => ({
          header: `${item.personalData.name} ${item.personalData.surname}`,
          bottomRightText:
            item.status !== undefined ? Status[item.status] : undefined,
          alignment: 'right',
        })}
        filterFunction={searchEngineNameSurnameFilter}
        searchEnginePlaceholder="Search by name or surname"
      />
      {canSubmit && (
        <ButtonTamagui
          text={TRANSLATIONS.SELECT_FIELDS.next_step_button}
          buttonProps={{
            onPress: () => onSetAction(),
          }}
        />
      )}
    </YStack>
  );
}

function MachineSelector({
  modalRef,
  onSetAction,
  machineListRef,
}: SelectMachineProps) {
  const [canSubmit, setCanSubmit] = useState(false);
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['machines'],
    queryFn: getAllMachines,
  });
  return (
    <YStack f={1}>
      <List<MachineResponseBase>
        isSelectable
        triggerOnSelectedChange={isEmpty => {
          setCanSubmit(!isEmpty);
        }}
        ref={machineListRef}
        isFetching={isFetching}
        isError={isError}
        isLoading={isLoading}
        data={data}
        modalRef={modalRef}
        listStyleSettings={item => ({
          header: item.name,
          bottomRightText: item.licensePlate,
          alignment: 'left',
          infoIco: true,
        })}
        filterFunction={machineFilter}
        searchEnginePlaceholder="Search machine"
      />
      {canSubmit && (
        <ButtonTamagui
          text={TRANSLATIONS.SELECT_FIELDS.next_step_button}
          buttonProps={{
            onPress: () => onSetAction(),
          }}
        />
      )}
    </YStack>
  );
}
export function CreateTask({
  route: { params },
}: OrdersDriverScreenProps<'createTask', 'ordersDriver', 'ownerRootDriver'>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { order, client } = params;

  const modalRef = useRef<BottomSheetModal>(null);
  const fieldListRef = useRef<ListRef<FieldResponseBase>>(null);
  const workerListRef = useRef<ListRef<WorkerResponseBase>>(null);
  const machineListRef = useRef<ListRef<MachineResponseBase>>(null);
  const [taskData, setTaskData] = useState<TaskData | undefined>();

  const [screenState, setScreenState] = useState(ScreenState.SelectField);
  console.log(taskData, 'Tests');
  return (
    <ScreenBase
      name="createTask"
      bottomSheetsProps={{
        modalRef,
        snapPoints: ['50%', '70%'],
      }}
    >
      <YStack f={1} className="mt-2">
        <YStack className="mt-2">
          {screenState !== ScreenState.AllSelected && (
            <GuideCard
              header={hintCard[screenState].header}
              text={hintCard[screenState].text}
            >
              <GuideCardElement
                isCurent={screenState === ScreenState.SelectField}
                isDone={!!taskData?.fields?.length}
                text={TRANSLATIONS.SELECT_FIELDS.next_step_button}
              />
              <GuideCardElement
                isCurent={screenState === ScreenState.SelectWorker}
                isDone={!!taskData?.worker}
                text={TRANSLATIONS.SELECT_WORKER.next_step_button}
              />
              <GuideCardElement
                text={TRANSLATIONS.SELECT_MACHINE.next_step_button}
              />
            </GuideCard>
          )}
        </YStack>
        {screenState === ScreenState.SelectField && (
          <FieldSelector
            client={client}
            modalRef={modalRef}
            onSetAction={() => {
              setTaskData({
                fields: fieldListRef.current?.items,
                worker: undefined,
                machines: undefined,
              });
              setScreenState(ScreenState.SelectWorker);
            }}
            fieldListRef={fieldListRef}
          />
        )}
        {screenState === ScreenState.SelectWorker && (
          <WorkerSelector
            modalRef={modalRef}
            workerListRef={workerListRef}
            onSetAction={() => {
              setTaskData(p => ({
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
            modalRef={modalRef}
            machineListRef={machineListRef}
            onSetAction={() => {
              setTaskData(p => ({
                fields: p?.fields,
                worker: p?.worker,
                machines: machineListRef.current?.items[0],
              }));
              setScreenState(ScreenState.AllSelected);
            }}
          />
        )}
      </YStack>
    </ScreenBase>
  );
}
