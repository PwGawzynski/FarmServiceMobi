import { useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { YStack } from 'tamagui';
import { useQuery } from '@tanstack/react-query';
import { ScreenBase } from '../common/ScreenBase';
import { OrdersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDriverProps';
import { FieldResponseBase } from '../../../../../FarmServiceApiTypes/Field/Ressponses';
import { ClientFieldsList } from '../../../../organisms/ClientFieldsList';
import { GuideCard, GuideCardElement } from '../../../../atoms/GuideCard';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import { getClientFields } from '../../../../../api/clients/Client';
import { EXPO_PUBLIC_QUERY_STALE_TIME } from '../../../../../settings/query/querySettings';
import SelectAll from '../../../../../assets/list-checks.svg';

export function CreateTask({
  route: { params },
}: OrdersDriverScreenProps<'createTask', 'ordersDriver', 'ownerRootDriver'>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { order, client } = params;
  const [fields, setFields] = useState<FieldResponseBase[] | []>([]);
  const modalRef = useRef<BottomSheetModal>(null);
  const [selectAll, setSelectAll] = useState(false);

  const { data } = useQuery({
    queryKey: ['clientFields', client.id],
    queryFn: keys => getClientFields(keys.queryKey[1] as string),
    staleTime: EXPO_PUBLIC_QUERY_STALE_TIME,
  });

  const handleFieldSelection = (field: FieldResponseBase) =>
    setFields(p => [...p, field]);
  const handleFieldDeselection = (field: FieldResponseBase) =>
    setFields(prevState => prevState.filter(f => f.id !== field.id));

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
              >
                <GuideCardElement isDone text="Select fields" />
                <GuideCardElement isCurent text="Select worker" />
                <GuideCardElement text="Select machine" />
              </GuideCard>
            </YStack>
          </YStack>
          <ClientFieldsList
            fields={fields}
            onItemSelected={handleFieldSelection}
            onItemDeselected={handleFieldDeselection}
            client={client}
            modalRef={modalRef}
          />
          <ButtonTamagui
            text={selectAll ? 'Deselect all' : 'Select all'}
            icon={<SelectAll />}
            buttonProps={{
              onPress: () => {
                if (!selectAll) {
                  setFields(data as FieldResponseBase[]);
                  setSelectAll(true);
                } else {
                  setFields([]);
                  setSelectAll(false);
                }
              },
            }}
          />
          {fields.length > 0 && (
            <ButtonTamagui
              text={selectAll ? 'Deselect all' : 'Select all'}
              icon={<SelectAll />}
              buttonProps={{
                onPress: () => {},
              }}
            />
          )}
        </>
      )}
    </ScreenBase>
  );
}
