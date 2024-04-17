import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useMutation } from '@tanstack/react-query';
import { t } from 'i18next';
import { SizableText, Spinner, XStack, YStack } from 'tamagui';
import { ScreenBase } from '../common/ScreenBase';
import { getDataFromCords } from '../../../../../api/geoportal/Geoportal';
import { DataFromXMLRes } from '../../../../../FarmServiceApiTypes/Field/Ressponses';
import { AddFieldForm } from '../../../../organisms/AddFieldForm';
import { AuthDriverProps } from '../../../../../types/self/navigation/Owner/props/AuthDriverProps';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { AppLinkButton } from '../../../../atoms/AppLinkButton';
import { AlertI, TwoOptionAlert } from '../../../../molecules/TwoOptionAlert';

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

const TRANSLATIONS = {
  gpsConnecting: t(
    TranslationNames.screens.authDriver.createField.gpsConnecting,
  ),
  gpsAccess: t(TranslationNames.screens.authDriver.createField.gpsAccess),
  gpsMoreInfo: t(TranslationNames.screens.authDriver.createField.gpsMoreInfo),
  gpsError: t(TranslationNames.screens.authDriver.createField.gpsError),
  serverError: t(TranslationNames.screens.authDriver.createField.serverError),
  screenTitle: t(TranslationNames.screens.authDriver.createField.screenTitle),
};

const initAlert: AlertI = {
  status: false,
  title: t(TranslationNames.screens.authDriver.createField.locationPolicyTitle),
  description: t(
    TranslationNames.screens.authDriver.createField.locationPolicyDescription,
  ),
  leftButtonText: t(
    TranslationNames.screens.authDriver.createField.locationPolicyButton,
  ),
  rightButtonText: undefined,
  onLeftButtonClick: undefined,
  onRightButtonClick: undefined,
};

export function AddFiled({
  navigation,
  route: {
    params: { client, goBack },
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

  const [alert, setAlert] = useState<AlertI>({
    ...initAlert,
  });
  return (
    <ScreenBase name={TRANSLATIONS.screenTitle}>
      <TwoOptionAlert
        open={alert.status}
        title={alert.title}
        description={alert.description}
        leftButtonText={alert.leftButtonText}
        rightButtonText={alert.rightButtonText}
        onLeftButtonClick={() => setAlert({ ...initAlert, status: false })}
        onRightButtonClick={alert.onRightButtonClick}
      />
      {!transformedData && (
        <XStack f={1} ai="center" jc="center">
          <Spinner color="$color4" size="large" />
          <SizableText className="ml-4 font-bold text-lg ">
            {TRANSLATIONS.gpsConnecting}
          </SizableText>
        </XStack>
      )}
      {machineState === State.PermissionErr && (
        <YStack f={1} ai="center" jc="center">
          <SizableText className="ml-4 font-bold text-lg text-error-red text-center">
            {TRANSLATIONS.gpsAccess}
          </SizableText>
          <XStack className="items-center justify-center mt-2">
            <AppLinkButton
              className="items-center justify-center"
              textClassName=" text-dark-blue dark:text-white"
              title={TRANSLATIONS.gpsMoreInfo}
              onPress={() => setAlert({ ...initAlert, status: true })}
            />
          </XStack>
        </YStack>
      )}
      {machineState === State.GPSError && (
        <XStack f={1} ai="center" jc="center">
          <SizableText className="ml-4 font-bold text-lg text-error-red">
            {TRANSLATIONS.gpsError}
          </SizableText>
        </XStack>
      )}
      {machineState === State.ConvertErr && (
        <XStack f={1} ai="center" jc="center">
          <SizableText className="ml-4 font-bold text-lg text-error-red">
            {TRANSLATIONS.serverError}
          </SizableText>
        </XStack>
      )}
      {transformedData && locationData && (
        <AddFieldForm
          transformedData={transformedData}
          gpsCords={locationData}
          client={client}
          navigation={navigation}
          goBack={goBack}
        />
      )}
    </ScreenBase>
  );
}
