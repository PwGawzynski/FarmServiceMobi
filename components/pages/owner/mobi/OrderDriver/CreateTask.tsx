import { RefObject, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { YStack } from 'tamagui';
import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import { OrdersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDriverProps';
import ClientFieldsList, {
  ClientFieldsListRef,
} from '../../../../organisms/ClientFieldsList';
import { GuideCard, GuideCardElement } from '../../../../atoms/GuideCard';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import { ClientResponseBase } from '../../../../../FarmServiceApiTypes/Clients/Responses';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { WorkerList, WorkerListRef } from '../../../../organisms/WorkerList';
import { FieldResponseBase } from '../../../../../FarmServiceApiTypes/Field/Ressponses';
import { WorkerResponseBase } from '../../../../../FarmServiceApiTypes/Worker/Responses';
import { MachineResponseBase } from '../../../../../FarmServiceApiTypes/Machine/Responses';

enum ScreenState {
  SelectField,
  SelectWorker,
  SelectMachine,
}

interface SelectFieldsProps {
  client: ClientResponseBase;
  modalRef: RefObject<BottomSheetModal>;
  onSetAction: () => void;
  fieldListRef: RefObject<ClientFieldsListRef>;
}

interface SelectWorkerProps {
  modalRef: RefObject<BottomSheetModal>;
  onSetAction: () => void;
  workerListRef: RefObject<WorkerListRef>;
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
  return (
    <YStack f={1}>
      <ClientFieldsList
        isSelectable
        triggerOnSelectedChange={isEmpty => {
          setCanSubmit(!isEmpty);
        }}
        ref={fieldListRef}
        client={client}
        modalRef={modalRef}
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
  return (
    <YStack f={1}>
      <WorkerList
        modalRef={modalRef}
        isSelectable
        ref={workerListRef}
        triggerOnSelectedChange={isEmpty => {
          setCanSubmit(!isEmpty);
        }}
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
  const fieldListRef = useRef<ClientFieldsListRef>(null);
  const workerListRef = useRef<WorkerListRef>(null);
  const [taskData, setTaskData] = useState<TaskData | undefined>();

  const [screenState, setScreenState] = useState(ScreenState.SelectField);

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
        </YStack>
        {screenState === ScreenState.SelectField && (
          <FieldSelector
            client={client}
            modalRef={modalRef}
            onSetAction={() => {
              setTaskData({
                fields: fieldListRef.current?.fields,
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
                worker: workerListRef.current?.workers[0],
                machines: undefined,
              }));
              setScreenState(ScreenState.SelectMachine);
            }}
          />
        )}
      </YStack>
    </ScreenBase>
  );
}
