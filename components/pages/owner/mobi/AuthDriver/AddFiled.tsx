import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useMutation } from '@tanstack/react-query';
import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import { getDataFromCords } from '../../../../../api/geoportal/Geoportal';
import { DataFromXMLRes } from '../../../../../FarmServiceApiTypes/Field/Ressponses';
import { AddFieldForm } from '../../../../organisms/AddFieldForm';
import { AuthDriverProps } from '../../../../../types/self/navigation/Owner/props/AuthDriverProps';
import { TranslationNames } from '../../../../../locales/TranslationNames';

enum State {
  WaitingForPermissionGrant = 0.222,
  PermissionErr = 0.333,
  PermissionGranted = 0.444,
  WaitingForGps = 0.555,
  GPSError = 0.666,
  GPSCConnected = 0.777,
  WaitingForDataTransform = 0.888,
  ConvertErr = 0.999,
  DataTransformed = 1,
}

export function AddFiled({
  navigation,
  route: {
    params: { client },
  },
}: AuthDriverProps<'addField'>) {
  const [machineState, setMachineState] = useState<State>(
    State.WaitingForPermissionGrant,
  );

  const { mutate, data, isError, isPending, isSuccess } = useMutation({
    mutationKey: ['locationCordsData'],
    mutationFn: getDataFromCords,
  });
  const [transformedData, setTransformedData] = useState<DataFromXMLRes | null>(
    null,
  );
  /**
   * Data got from expo-gps
   */
  const [locationData, setLocationData] =
    useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setMachineState(State.PermissionErr);
      }
      if (status === 'granted') {
        setMachineState(State.PermissionGranted);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (machineState === State.PermissionGranted)
        setMachineState(State.WaitingForGps);

      if (machineState === State.WaitingForGps) {
        const locationGot = await Location.getCurrentPositionAsync({});
        if (locationGot) {
          setMachineState(State.GPSCConnected);
          setLocationData(locationGot);
        } else setMachineState(State.GPSError);
      }

      if (machineState === State.GPSCConnected && locationData) {
        mutate({
          longitude: locationData.coords.longitude.toString(),
          latitude: locationData.coords.latitude.toString(),
        });
      }
    })();
  }, [machineState, locationData]);

  useEffect(() => {
    if (isPending) setMachineState(State.WaitingForDataTransform);
    if (isError) setMachineState(State.ConvertErr);
    if (isSuccess) setMachineState(State.DataTransformed);
    if (data) setTransformedData(data);
  }, [isSuccess, isPending, isError, data]);
  console.log(data, transformedData, locationData);
  return (
    <ScreenBase
      name={t(TranslationNames.screens.authDriver.createField.screenTitle)}
    >
      {transformedData && locationData && (
        <AddFieldForm
          transformedData={transformedData}
          gpsCords={locationData}
          client={client}
          navigation={navigation}
        />
      )}
    </ScreenBase>
  );
}
