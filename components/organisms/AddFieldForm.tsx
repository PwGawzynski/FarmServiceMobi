import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { LocationObject } from 'expo-location';
import { useMutation } from '@tanstack/react-query';
import { t } from 'i18next';
import { View } from 'react-native';
import { YStack } from 'tamagui';
import { FormCreator } from '../atoms/FormCreator';
import { createFieldSetup } from '../../helepers/FormSetups/CreateFieldSetup';
import { DataFromXMLRes } from '../../FarmServiceApiTypes/Field/Ressponses';
import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';
import { AuthDriverNavigationProps } from '../../types/self/navigation/Owner/props/AuthDriverProps';
import { createField } from '../../api/field/Field';
import { ButtonTamagui } from '../atoms/ButtonTamagui';
import { PendingInfo } from '../atoms/PendingInfo';
import { TranslationNames } from '../../locales/TranslationNames';
import { FormErrorInfo } from '../atoms/FormErrorInfo';

interface Props {
  transformedData: DataFromXMLRes;
  gpsCords: LocationObject;
  client: ClientResponseBase;
  navigation: AuthDriverNavigationProps<'addField'>;
}

export interface ExtendedFormData extends DataFromXMLRes {
  longitude: string;
  latitude: string;
  nameLabel: string;
}

export function AddFieldForm({
  transformedData,
  gpsCords,
  client,
  navigation,
}: Props) {
  const { mutate, isSuccess, error, isPending } = useMutation({
    mutationKey: ['createField'],
    mutationFn: createField,
  });
  useEffect(() => {
    if (isSuccess)
      navigation.navigate('OperationConfirmed', {
        redirectScreenName: 'clientFields',
        shownMessage: t(
          TranslationNames.screens.authDriver.createField.successMessage,
        ),
        payload: { client },
        goBack: true,
      });
  }, [isSuccess]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(
      () =>
        ({
          city: transformedData.city,
          county: transformedData.county,
          voivodeship: transformedData.voivodeship,
          polishSystemId: transformedData.polishSystemId,
          area: transformedData.area && transformedData.area.toString(),
        }) as ExtendedFormData,
      [],
    ),
  });
  const onSubmitted = (data: ExtendedFormData) =>
    mutate({
      area: Number(data.area),
      polishSystemId: data.polishSystemId,
      dateOfCollectionData: transformedData.dateOfCollectionData,
      client: client.id,
      nameLabel: data.nameLabel,
      address: {
        county: data.county,
        voivodeship: data.voivodeship,
        city: data.city,
        longitude: gpsCords.coords.longitude.toString().slice(0, 14),
        latitude: gpsCords.coords.latitude.toString().slice(0, 14),
      },
    });
  return (
    <YStack f={1}>
      <View className="w-full h-6 mt-2 overflow-hidden flex-row justify-center items-center">
        {!error && (
          <PendingInfo
            isVisible={isPending}
            infoText={t(
              TranslationNames.screens.clientDesktopDriver.createClient
                .pendingStatus,
            )}
          />
        )}
        {error && <FormErrorInfo error={error.message} />}
      </View>
      <FormCreator
        controllerSetups={createFieldSetup(control)}
        errors={errors}
      />
      <ButtonTamagui
        text={t(TranslationNames.screens.authDriver.createField.submitButton)}
        buttonProps={{
          onPress: handleSubmit(onSubmitted),
        }}
      />
    </YStack>
  );
}
