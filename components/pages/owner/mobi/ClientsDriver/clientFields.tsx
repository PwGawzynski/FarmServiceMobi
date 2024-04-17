import { YStack } from 'tamagui';
import { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import { ClientsDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/clients/ClientsDriverProps';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import PlusIco from '../../../../../assets/plus.svg';
import { getClientFields } from '../../../../../api/clients/Client';
import { EXPO_PUBLIC_QUERY_STALE_TIME } from '../../../../../settings/query/querySettings';
import List from '../../../../organisms/List';
import { FieldResponseBase } from '../../../../../FarmServiceApiTypes/Field/Ressponses';
import { clientFieldsFilter } from '../../../../../helepers/filterFunctions';
import { FieldBottomSheetContent } from '../../../../molecules/FieldBottomSheetContent';
import { TranslationNames } from '../../../../../locales/TranslationNames';

export const createFieldBottomSign = (item: FieldResponseBase) =>
  `${
    item.address.city.substring(0, 10).toUpperCase() +
    (item.address.city.length > 10 ? '...' : '')
  }  ID: ${item.polishSystemId.substring(
    item.polishSystemId.length - 3,
    item.polishSystemId.length,
  )}  ${
    Number.isNaN(Number(item.area)) ? '' : Number(item.area).toFixed(2)
  } Ha  (~${Math.random().toFixed(2)} Km)`;

const TRANSLATIONS = {
  fields: t(TranslationNames.screens.clientDriver.clientFields.title),
  searchField: t(
    TranslationNames.screens.clientDriver.clientFields.searchPlaceholder,
  ),
  submitButton: t(
    TranslationNames.screens.clientDriver.clientFields.submitButton,
  ),
};

export function ClientFields({
  route,
  navigation,
}: ClientsDriverScreenProps<
  'clientFields',
  'clientsDriver',
  'ownerRootDriver'
>) {
  const { client } = route.params;
  const { data, isError, isFetching } = useQuery({
    queryKey: ['clientFields', client.id],
    queryFn: keys => getClientFields(keys.queryKey[1] as string),
    staleTime: EXPO_PUBLIC_QUERY_STALE_TIME,
  });

  const modalRef = useRef<BottomSheetModal>(null);
  const handlePress = (item: FieldResponseBase) => {
    modalRef.current?.present(
      <FieldBottomSheetContent
        field={item}
        client={client}
        bottomSheetRef={modalRef}
      />,
    );
  };

  return (
    <ScreenBase
      name={TRANSLATIONS.fields}
      bottomSheetsProps={{
        modalRef,
        snapPoints: ['50%', '70%'],
      }}
    >
      <List<FieldResponseBase>
        isFetching={isFetching}
        isError={isError}
        data={data}
        handleOnItemPress={handlePress}
        modalRef={modalRef}
        listStyleSettings={item => ({
          header: item.nameLabel,
          bottomRightText: createFieldBottomSign(item),
          alignment: 'left',
          infoIco: true,
        })}
        filterFunction={clientFieldsFilter}
        searchEnginePlaceholder={TRANSLATIONS.searchField}
      />
      <YStack mb="$2">
        <ButtonTamagui
          icon={<PlusIco />}
          text={TRANSLATIONS.submitButton}
          buttonProps={{
            onPress: () => navigation.navigate('addField', { client }),
          }}
        />
      </YStack>
    </ScreenBase>
  );
}
