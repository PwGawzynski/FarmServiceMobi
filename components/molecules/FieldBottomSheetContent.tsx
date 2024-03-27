import { SizableText, XStack, YStack } from 'tamagui';
import { useMemo } from 'react';
import { t } from 'i18next';
import { Linking, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
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

export type FieldBottomSheetProps = {
  field: FieldResponseBase;
};
const names: Record<keyof FieldAddressResponseBase, string> = {
  city: t(TranslationNames.addressForm.formPlaceholder.city),
  county: t(TranslationNames.addressForm.formPlaceholder.county),
  voivodeship: t(TranslationNames.addressForm.formPlaceholder.voivodeship),
  longitude: t(TranslationNames.addressForm.formPlaceholder.longitude),
  latitude: t(TranslationNames.addressForm.formPlaceholder.latitude),
};
export function FieldBottomSheetContent({ field }: FieldBottomSheetProps) {
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
  const openAddressOnMap = (label: string, lat: string, lng: string) => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
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
  };
  return (
    <YStack f={1} ml="$4" mr="$4">
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
            <SizableText>Ha</SizableText>
          </XStack>
        </XStack>
        <ButtonTamagui
          text={t(TranslationNames.components.filedBottomSheet.showOnMapButton)}
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
          text={t(TranslationNames.components.filedBottomSheet.editButton)}
          icon={<PenIco />}
          buttonProps={{
            mt: '$4',
          }}
        />
        <ButtonTamagui
          text={t(TranslationNames.components.filedBottomSheet.addButton)}
          icon={<PlusIco />}
          buttonProps={{
            mt: '$4',
          }}
        />
        <ButtonTamagui
          text={t(TranslationNames.components.filedBottomSheet.historyButton)}
          icon={<History />}
          buttonProps={{
            mt: '$4',
          }}
        />
        <ButtonTamagui
          text={t(TranslationNames.components.filedBottomSheet.deleteButton)}
          icon={<Trash />}
          buttonProps={{
            mt: '$4',
          }}
          bgColor="$color7"
          elementColor="#fff"
        />
        <SizableText
          color="$color10"
          mt="$4"
          className="uppercase text-xl font-bold"
        >
          {t(TranslationNames.components.filedBottomSheet.address)}
        </SizableText>
        <YStack>{address}</YStack>
      </YStack>
    </YStack>
  );
}
