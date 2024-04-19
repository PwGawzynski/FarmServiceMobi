import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LocationObject } from 'expo-location';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { t } from 'i18next';
import { Platform, View } from 'react-native';
import { YStack } from 'tamagui';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FormCreator } from '../atoms/FormCreator';
import { createFieldSetup } from '../../helepers/FormSetups/CreateFieldSetup';
import {
  DataFromXMLRes,
  FieldResponseBase,
} from '../../FarmServiceApiTypes/Field/Ressponses';
import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';
import { AuthDriverNavigationProps } from '../../types/self/navigation/Owner/props/AuthDriverProps';
import { createField, editField } from '../../api/field/Field';
import { ButtonTamagui } from '../atoms/ButtonTamagui';
import { PendingInfo } from '../atoms/PendingInfo';
import { TranslationNames } from '../../locales/TranslationNames';
import { FormErrorInfo } from '../atoms/FormErrorInfo';
import PlusIco from '../../assets/plus.svg';
import { updateFieldReqI } from '../../FarmServiceApiTypes/Field/Requests';
import { Colors } from '../../settings/styles/colors';
import { getDataFromCords } from '../../api/geoportal/Geoportal';
import CrosshatchIco from '../../assets/crosshair.svg';

const TRANSLATIONS = {
  successMessage: t(
    TranslationNames.screens.authDriver.createField.successMessage,
  ),
  submitButton: t(TranslationNames.screens.authDriver.createField.submitButton),
  editSubmitButton: t(
    TranslationNames.screens.authDriver.createField.editSubmitButton,
  ),
  pendingStatus: t(
    TranslationNames.screens.clientDesktopDriver.createClient.pendingStatus,
  ),
  resetButton: t(TranslationNames.screens.authDriver.createField.resetButton),
  marker: t(TranslationNames.screens.authDriver.createField.markerName),
  markerDescription: t(
    TranslationNames.screens.authDriver.createField.markerDescription,
  ),
};

interface Props {
  navigation:
    | AuthDriverNavigationProps<'addField'>
    | AuthDriverNavigationProps<'editField'>;
  transformedData?: DataFromXMLRes;
  gpsCords?: LocationObject;
  client: ClientResponseBase;
  field?: FieldResponseBase;
  goBack?: boolean;
}

export interface ExtendedFormData extends DataFromXMLRes {
  longitude: string;
  latitude: string;
  nameLabel?: string;
}
const prepareData = (
  transformedData: DataFromXMLRes,
  data: ExtendedFormData,
  client: ClientResponseBase,
  gpsCords: LocationObject,
) => ({
  area: Number(data.area),
  polishSystemId: data.polishSystemId,
  dateOfCollectionData: transformedData.dateOfCollectionData,
  client: client.id,
  nameLabel: data.nameLabel || '',
  address: {
    county: data.county,
    voivodeship: data.voivodeship,
    city: data.city,
    longitude: gpsCords.coords.longitude.toString().slice(0, 14),
    latitude: gpsCords.coords.latitude.toString().slice(0, 14),
  },
});

const prepareDataEdit = (
  data: ExtendedFormData,
  field: FieldResponseBase,
  client: ClientResponseBase,
) =>
  ({
    field: field.id,
    area: Number(data.area),
    polishSystemId: data.polishSystemId,
    dateOfCollectionData: field.dateOfCollectionData,
    client: client.id,
    nameLabel: data.nameLabel || '',
    address: {
      county: data.county,
      voivodeship: data.voivodeship,
      city: data.city,
      longitude: field.address.longitude.toString().slice(0, 14),
      latitude: field.address.latitude.toString().slice(0, 14),
    },
  }) as updateFieldReqI;
export function AddFieldForm({
  transformedData: td,
  gpsCords,
  client,
  field,
  navigation,
  goBack,
}: Props) {
  const [transformedData, setTransformedData] = useState<
    DataFromXMLRes | undefined
  >(td);
  const queryClient = useQueryClient();
  const { mutate, isSuccess, error, isPending } = useMutation({
    mutationKey: ['createField'],
    mutationFn: createField,
    onSuccess: sth => {
      queryClient.setQueryData(
        ['clientFields', client.id],
        (oldData: Array<FieldResponseBase>) => {
          return oldData ? [...oldData, sth] : [sth];
        },
      );
    },
  });
  const {
    mutate: getFromCords,
    data: cordsData,
    isPending: cordsPending,
  } = useMutation({
    mutationKey: ['locationCordsData'],
    mutationFn: getDataFromCords,
  });

  const {
    mutate: edit,
    isSuccess: isEditSuccess,
    error: editError,
    isPending: isEditPending,
  } = useMutation({
    mutationKey: ['createField'],
    mutationFn: editField,
    onSuccess: sth => {
      queryClient.setQueryData(
        ['clientFields', client.id],
        (oldData: Array<FieldResponseBase>) => {
          if (sth)
            return [...oldData.filter(_field => _field.id !== sth.id), sth];
          return oldData;
        },
      );
    },
  });

  useEffect(() => {
    if (isSuccess || isEditSuccess)
      if (goBack) {
        navigation.goBack();
      } else {
        navigation.navigate('OperationConfirmed', {
          redirectScreenName: 'clientFields',
          shownMessage: TRANSLATIONS.successMessage,
          payload: { client },
          goBack: true,
        });
      }
  }, [isSuccess, isEditSuccess]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: useMemo(() => {
      const area = Number.isNaN(Number(field?.area))
        ? field?.area
        : Number(field?.area)
            .toFixed(4)
            .toString();
      return {
        nameLabel: field?.nameLabel || undefined,
        city: field?.address.city || transformedData?.city,
        county: field?.address.county || transformedData?.county,
        voivodeship: field?.address.voivodeship || transformedData?.voivodeship,
        polishSystemId:
          field?.polishSystemId || transformedData?.polishSystemId,
        area:
          area ||
          (transformedData?.area &&
            transformedData?.area.toFixed(4).toString()),
      } as ExtendedFormData;
    }, []),
  });
  const onSubmitted = (data: ExtendedFormData) => {
    if (field) edit(prepareDataEdit(data, field, client));
    else if (transformedData && gpsCords)
      mutate(prepareData(transformedData, data, client, gpsCords));
  };
  useEffect(() => {
    console.log(cordsData);
    if (cordsData) {
      setTransformedData(cordsData);
      reset(cordsData);
    }
  }, [cordsData]);
  const initialState = {
    latitude: gpsCords?.coords.latitude || 37.78825,
    longitude: gpsCords?.coords.longitude || -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const mapRef = useRef<MapView>(null);
  const handleMapReset = () =>
    mapRef.current?.animateCamera({
      center: initialState,
      pitch: 0,
      heading: 0,
      altitude: 1000,
      zoom: 19,
    });
  return (
    <YStack f={1} className="mt-4">
      <MapView
        showsUserLocation
        ref={mapRef}
        shouldRasterizeIOS
        initialRegion={initialState}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        style={{
          flex: 1,
          borderRadius: 20,
        }}
        mapType="satellite"
        cacheEnabled={false}
      >
        <Marker
          coordinate={initialState}
          pinColor={Colors.GREEN}
          description={TRANSLATIONS.markerDescription}
          title={TRANSLATIONS.marker}
          draggable
          onDragEnd={e =>
            getFromCords({
              latitude: e.nativeEvent.coordinate.latitude.toString(),
              longitude: e.nativeEvent.coordinate.longitude.toString(),
            })
          }
        />
      </MapView>
      <ButtonTamagui
        icon={<CrosshatchIco />}
        text={TRANSLATIONS.resetButton}
        buttonProps={{
          size: '$2',
          marginTop: '$2',
          onPress: handleMapReset,
        }}
      />
      <View className="w-full h-6 mt-2 overflow-hidden flex-row justify-center items-center">
        {!error && !editError && (
          <PendingInfo
            isVisible={isPending || isEditPending}
            infoText={TRANSLATIONS.pendingStatus}
          />
        )}
        {(error || editError) && (
          <FormErrorInfo error={error?.message || editError?.message} />
        )}
      </View>
      {!cordsPending ? (
        <FormCreator
          controllerSetups={createFieldSetup(control)}
          errors={errors}
        />
      ) : (
        <YStack f={1}>
          <PendingInfo
            isVisible={cordsPending}
            infoText="Searching for field..."
          />
        </YStack>
      )}
      <ButtonTamagui
        icon={<PlusIco />}
        text={field ? TRANSLATIONS.editSubmitButton : TRANSLATIONS.submitButton}
        buttonProps={{
          onPress: handleSubmit(onSubmitted),
        }}
      />
    </YStack>
  );
}
