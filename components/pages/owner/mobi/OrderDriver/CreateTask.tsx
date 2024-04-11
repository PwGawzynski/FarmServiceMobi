import { useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { YStack } from 'tamagui';
import { ScreenBase } from '../common/ScreenBase';
import { OrdersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDriverProps';
import { FieldResponseBase } from '../../../../../FarmServiceApiTypes/Field/Ressponses';
import { ClientFieldsList } from '../../../../organisms/ClientFieldsList';
import { BlinkingHeader } from '../../../../atoms/BlinkingHeader';
import { GuideCard } from '../../../../atoms/GuideCard';

export function CreateTask({
  route: { params },
}: OrdersDriverScreenProps<'createTask', 'ordersDriver', 'ownerRootDriver'>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { order, client } = params;
  const [fields, setFields] = useState<FieldResponseBase[] | []>([]);
  const modalRef = useRef<BottomSheetModal>(null);

  const handleFieldSelection = (field: FieldResponseBase) =>
    setFields(p => [...p, field]);
  const handleFieldDeselection = (field: FieldResponseBase) =>
    setFields(prevState => prevState.filter(f => f.id !== field.id));

  console.log(fields, 'fields');
  return (
    <ScreenBase
      name="createTask"
      bottomSheetsProps={{
        modalRef,
        snapPoints: ['50%', '70%'],
      }}
    >
      {!(fields.length > 100) && (
        <>
          <YStack className="mt-2 ">
            <YStack className="mt-2">
              <GuideCard
                header="Hint"
                text="You can choose multiple fields, each field will be considered as a separate task"
              />
              <BlinkingHeader
                isPlayed={fields.length === 0}
                cName="mt-4"
                text="Step one: choose fields"
              />
            </YStack>
          </YStack>
          <ClientFieldsList
            onItemSelected={handleFieldSelection}
            onItemDeselected={handleFieldDeselection}
            client={client}
            modalRef={modalRef}
          />
        </>
      )}
    </ScreenBase>
  );
}
