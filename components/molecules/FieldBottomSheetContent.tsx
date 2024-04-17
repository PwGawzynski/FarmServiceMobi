import { SizableText, XStack, YStack } from 'tamagui';
import { RefObject, useEffect, useMemo, useState } from 'react';
import { t } from 'i18next';
import { Linking, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FieldResponseBase } from '../../FarmServiceApiTypes/Field/Ressponses';
import { KeyValuePair } from '../atoms/KeyValuePair';
import { ButtonTamagui } from '../atoms/ButtonTamagui';
import LocationIco from '../../assets/location_pin.svg';
import PenIco from '../../assets/pen.svg';
import PlusIco from '../../assets/plus.svg';
import History from '../../assets/history.svg';
import Trash from '../../assets/trash.svg';
import { FieldAddressResponseBase } from '../../FarmServiceApiTypes/FiledAddress/Ressponses';
import { TranslationNames } from '../../locales/TranslationNames';
import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';
import { AlertI, TwoOptionAlert } from './TwoOptionAlert';
import { delField } from '../../api/field/Field';

const IOS_MAPS_OPEN_MARK = 'maps:0,0?q=';
const ANDROID_MAPS_OPEN_MARK = 'geo:0,0?q=';
const TRANSLATIONS = {
  ha: t(TranslationNames.components.filedBottomSheet.ha),
  address: t(TranslationNames.components.filedBottomSheet.address),
  showOnMapButton: t(
    TranslationNames.components.filedBottomSheet.showOnMapButton,
  ),
  editButton: t(TranslationNames.components.filedBottomSheet.editButton),
  addButton: t(TranslationNames.components.filedBottomSheet.addButton),
  historyButton: t(TranslationNames.components.filedBottomSheet.historyButton),
  deleteButton: t(TranslationNames.components.filedBottomSheet.deleteButton),
};

export type FieldBottomSheetProps = {
  field: FieldResponseBase;
  client?: ClientResponseBase;
  bottomSheetRef?: RefObject<BottomSheetModal>;
};
const names: Record<keyof FieldAddressResponseBase, string> = {
  city: t(TranslationNames.addressForm.formPlaceholder.city),
  county: t(TranslationNames.addressForm.formPlaceholder.county),
  voivodeship: t(TranslationNames.addressForm.formPlaceholder.voivodeship),
  longitude: t(TranslationNames.addressForm.formPlaceholder.longitude),
  latitude: t(TranslationNames.addressForm.formPlaceholder.latitude),
};

const initAlert: AlertI = {
  status: false,
  isDanger: true,
  title: t(TranslationNames.components.filedBottomSheet.deleteFieldAlertTitle),
  description: t(
    TranslationNames.components.filedBottomSheet.deleteFieldAlertDescription,
  ),
  leftButtonText: t(
    TranslationNames.components.filedBottomSheet.deleteFieldAlertDeleteButton,
  ),
  rightButtonText: t(
    TranslationNames.components.filedBottomSheet.deleteFieldAlertCancelButton,
  ),
  onLeftButtonClick: undefined,
  onRightButtonClick: undefined,
};
export function FieldBottomSheetContent({
  field,
  client,
  bottomSheetRef,
}: FieldBottomSheetProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  const address = useMemo(
    () =>
      Object.keys(field.address).map(key => (
        <KeyValuePair
          name={names[key as keyof typeof field.address]}
          value={field.address[key as keyof typeof field.address] as string}
          key={key}
        />
      )),
    [],
  );

  const openAddressOnMap = useMemo(
    () => (label: string, lat: string, lng: string) => {
      const scheme = Platform.select({
        ios: IOS_MAPS_OPEN_MARK,
        android: ANDROID_MAPS_OPEN_MARK,
      });
      const latLng = `${lat},${lng}`;
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      });
      Linking.openURL(url || '').catch(() => {
        Toast.show({
          type: 'error',
          text1: t(TranslationNames.components.toast.openMapErrorHeader),
          text2: t(TranslationNames.components.toast.openMapErrorDescription),
        });
      });
    },
    [],
  );

  const queryClient = useQueryClient();
  const { mutate, isError } = useMutation({
    mutationKey: ['deleteField', field.id],
    mutationFn: delField,
    onSuccess: (sth, variables) => {
      bottomSheetRef?.current?.dismiss();
      queryClient.setQueryData(
        ['clientFields', client?.id],
        (oldData: Array<FieldResponseBase>) => {
          if (variables)
            return [...oldData.filter(_field => _field.id !== field.id)];
          return oldData;
        },
      );
    },
  });

  const [alert, setAlert] = useState<AlertI>({
    ...initAlert,
  });

  useEffect(() => {
    if (isError)
      Toast.show({
        type: 'error',
        text1: t(TranslationNames.components.toast.cantDeleteFieldHeader),
        text2: t(TranslationNames.components.toast.cantDeleteFieldDescription),
      });
  }, [isError]);

  return (
    <YStack f={1} ml="$4" mr="$4">
      <TwoOptionAlert
        open={alert.status}
        isDanger={alert.isDanger}
        title={alert.title}
        description={alert.description}
        leftButtonText={alert.leftButtonText}
        rightButtonText={alert.rightButtonText}
        onLeftButtonClick={alert.onLeftButtonClick}
        onRightButtonClick={alert.onRightButtonClick}
      />
      <YStack f={1}>
        <XStack ai="center" jc="space-between">
          <SizableText color="$color10" className="uppercase text-xl font-bold">
            {field.nameLabel}
          </SizableText>
          <XStack>
            <SizableText className="uppercase">
              {Number.isNaN(Number(field.area))
                ? 'N/A'
                : Number(field.area).toFixed(2)}{' '}
            </SizableText>
            <SizableText>{TRANSLATIONS.ha}</SizableText>
          </XStack>
        </XStack>
        <ButtonTamagui
          text={TRANSLATIONS.showOnMapButton}
          icon={<LocationIco />}
          buttonProps={{
            mt: '$4',
            onPress: () =>
              openAddressOnMap(
                field.nameLabel,
                field.address.latitude,
                field.address.longitude,
              ),
          }}
        />
        <ButtonTamagui
          text={TRANSLATIONS.editButton}
          icon={<PenIco />}
          buttonProps={{
            mt: '$4',
            onPress: () => {
              navigation.navigate('editField', { field, client });
              bottomSheetRef?.current?.dismiss();
            },
          }}
        />
        <ButtonTamagui
          text={TRANSLATIONS.addButton}
          icon={<PlusIco />}
          buttonProps={{
            mt: '$4',
          }}
        />
        <ButtonTamagui
          text={TRANSLATIONS.historyButton}
          icon={<History />}
          buttonProps={{
            mt: '$4',
          }}
        />
        <ButtonTamagui
          text={TRANSLATIONS.deleteButton}
          icon={<Trash />}
          buttonProps={{
            mt: '$4',
            onPress: () =>
              setAlert({
                ...initAlert,
                status: true,
                onLeftButtonClick: () => {
                  setAlert({ ...initAlert, status: false });
                  mutate(field);
                },
                onRightButtonClick: () =>
                  setAlert({ ...initAlert, status: false }),
              }),
          }}
          bgColor="$color7"
          elementColor="#fff"
        />
        <SizableText
          color="$color10"
          mt="$4"
          className="uppercase text-xl font-bold"
        >
          {TRANSLATIONS.address}
        </SizableText>
        <YStack>{address}</YStack>
      </YStack>
    </YStack>
  );
}
