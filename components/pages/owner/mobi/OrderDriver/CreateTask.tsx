import { useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Card, SizableText, XStack, YStack } from 'tamagui';
import { useSelector } from 'react-redux';
import { ScreenBase } from '../common/ScreenBase';
import { OrdersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDriverProps';
import { FieldResponseBase } from '../../../../../FarmServiceApiTypes/Field/Ressponses';
import { ClientFieldsList } from '../../../../organisms/ClientFieldsList';
import InfoIcon from '../../../../../assets/info.svg';
import { selectTheme } from '../../../../../src/redux/feature/userSlice';
import { Theme } from '../../../../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../../../../settings/styles/colors';

export function CreateTask({
  route: { params },
}: OrdersDriverScreenProps<'createTask', 'ordersDriver', 'ownerRootDriver'>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { order, client } = params;
  const [fields, setFields] = useState<FieldResponseBase[] | []>([]);
  const modalRef = useRef<BottomSheetModal>(null);
  const theme = useSelector(selectTheme);

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
              <Card bordered borderColor="$color11" p="$3">
                <XStack>
                  <YStack f={1}>
                    <SizableText
                      fontSize="$4"
                      className="uppercase font-bold mb-3 text-light-blue dark:text-dark-gray"
                    >
                      Hint
                    </SizableText>
                    <SizableText className="text-light-blue dark:text-dark-gray">
                      You can choose multiple fields, each field will be
                      considered as a separate task
                    </SizableText>
                  </YStack>
                  <YStack ai="flex-end">
                    <InfoIcon
                      color={
                        theme === Theme.dark
                          ? Colors.DARK_GRAY
                          : Colors.LIGHT_BLUE
                      }
                    />
                  </YStack>
                </XStack>
              </Card>
            </YStack>
            <SizableText
              color="$color10"
              className="uppercase font-bold text-lg mt-4 text-center"
            >
              Step One: Choose Field
            </SizableText>
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
