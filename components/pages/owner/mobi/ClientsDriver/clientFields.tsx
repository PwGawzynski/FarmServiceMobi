import { YStack } from 'tamagui';
import { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ScreenBase } from '../common/ScreenBase';
import { ClientsDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/clients/ClientsDriverProps';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import PlusIco from '../../../../../assets/plus.svg';
import ClientFieldsList from '../../../../organisms/ClientFieldsList';

export function ClientFields({
  route,
  navigation,
}: ClientsDriverScreenProps<
  'clientFields',
  'clientsDriver',
  'ownerRootDriver'
>) {
  const { client } = route.params;

  const modalRef = useRef<BottomSheetModal>(null);
  return (
    <ScreenBase
      name="fields"
      bottomSheetsProps={{
        modalRef,
        snapPoints: ['50%', '70%'],
      }}
    >
      <ClientFieldsList client={client} modalRef={modalRef} />
      <YStack mb="$2">
        <ButtonTamagui
          icon={<PlusIco />}
          text="Add Filed"
          buttonProps={{
            onPress: () => navigation.navigate('addField', { client }),
          }}
        />
      </YStack>
    </ScreenBase>
  );
}
