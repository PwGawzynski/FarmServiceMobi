import { RefObject, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { YStack } from 'tamagui';
import { ScreenBase } from '../common/ScreenBase';
import { OrdersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDriverProps';
import ClientFieldsList, {
  ClientFieldsListRef,
} from '../../../../organisms/ClientFieldsList';
import { GuideCard, GuideCardElement } from '../../../../atoms/GuideCard';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import { ClientResponseBase } from '../../../../../FarmServiceApiTypes/Clients/Responses';

enum ScreenState {
  SelectField,
  SelectWorker,
  SelectMachine,
}

interface SelectFieldsProps {
  client: ClientResponseBase;
  modalRef: RefObject<BottomSheetModal>;
  setScreenState: React.Dispatch<React.SetStateAction<ScreenState>>;
}

function SelectFields({ client, modalRef, setScreenState }: SelectFieldsProps) {
  const fieldListRef = useRef<ClientFieldsListRef>(null);
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
          text="Create Task"
          buttonProps={{
            onPress: () => {
              setScreenState(ScreenState.SelectWorker);
              console.log(fieldListRef.current?.fields);
            },
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
            header="Hint"
            text="You can choose multiple fields, each field will be considered as a separate task"
          >
            <GuideCardElement
              isCurent={screenState === ScreenState.SelectField}
              isDone={screenState !== ScreenState.SelectField}
              text="Select fields"
            />
            <GuideCardElement
              isCurent={screenState === ScreenState.SelectWorker}
              isDone={screenState !== ScreenState.SelectField}
              text="Select worker"
            />
            <GuideCardElement text="Select machine" />
          </GuideCard>
        </YStack>
        {screenState === ScreenState.SelectField && (
          <SelectFields
            client={client}
            modalRef={modalRef}
            setScreenState={setScreenState}
          />
        )}
      </YStack>
    </ScreenBase>
  );
}
