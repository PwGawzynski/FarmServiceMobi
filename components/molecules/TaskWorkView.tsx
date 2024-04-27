import { YStack } from 'tamagui';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import MapView from 'react-native-maps';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { t } from 'i18next';
import Toast from 'react-native-toast-message';
import { TaskResponseBase } from '../../FarmServiceApiTypes/Task/Responses';
import { WorkerModalContext } from '../../helepers/context/WorkerModalContext';
import { ButtonTamagui } from '../atoms/ButtonTamagui';
import PauseIco from '../../assets/pause.svg';
import EndIco from '../../assets/circle-check-big.svg';
import { Switch } from '../atoms/Switch';
import { closeTask, pauseTask } from '../../api/Task/Task';
import { TranslationNames } from '../../locales/TranslationNames';
import { updateWorkerTasks } from '../../helepers/FetchingHelpers';
import {
  USER_LOCATION_FASTEST_INTERVAL_HIGH,
  USER_LOCATION_FASTEST_INTERVAL_LOW,
  USER_LOCATION_UPDATE_INTERVAL_HIGH,
  USER_LOCATION_UPDATE_INTERVAL_LOW,
} from '../../settings/map/defaults';
import { TimeCounter } from '../atoms/TimeCounter';
import { TaskSessionResponseBase } from '../../FarmServiceApiTypes/TaskSession/Responses';
import { useLocation } from '../../helepers/hooks/location';
import { performAction } from '../../helepers/taskSession/helpers';

export interface TaskWorkViewProps {
  task: TaskResponseBase;
  setTask: Dispatch<SetStateAction<TaskResponseBase>>;
  mapRef: React.RefObject<MapView>;
  onClosePress?: Dispatch<SetStateAction<boolean>>;
  uncloseSession?: TaskSessionResponseBase;
}

export interface UserLocationI {
  latitude?: number | undefined;
  longitude?: number | undefined;
  altitude?: number | undefined;
  timestamp?: number | undefined;
  accuracy?: number | undefined;
  speed?: number | undefined;
  heading?: number | undefined;
  altitudeAccuracy?: number | undefined;
  isFromMockProvider?: boolean | undefined;
}

// the lower the value, the more map is zoomed in
const FOCUS_DELTA = 0.001;

const TRANSLATIONS = {
  pauseButton: t(TranslationNames.components.taskWorkView.pauseButton),
  focusOnFieldButton: t(
    TranslationNames.components.taskWorkView.focusOnFieldButton,
  ),
  autofocusSwitch: t(TranslationNames.components.taskWorkView.autofocusSwitch),
  markAsDoneButton: t(
    TranslationNames.components.taskWorkView.markAsDoneButton,
  ),
  errorToastTitleClose: t(
    TranslationNames.components.taskWorkView.errorToastTitleClose,
  ),
  errorToastTitlePause: t(
    TranslationNames.components.taskWorkView.errorToastTitlePause,
  ),
  locationErrorHeader: t(
    TranslationNames.components.taskWorkView.locationErrorHeader,
  ),
  locationErrorDescription: t(
    TranslationNames.components.taskWorkView.locationErrorDescription,
  ),
};

export function TaskWorkView({
  task,
  mapRef,
  onClosePress,
  setTask,
  uncloseSession,
}: TaskWorkViewProps) {
  const modal = useContext(WorkerModalContext);
  const [isAutofocused, setIsAutofocused] = useState(true);
  const location = useLocation();

  /**
   * ----------------------------------------MUATATIONS----------------------------------------
   */
  const qc = useQueryClient();
  const { mutate: close, isPending: isClosePending } = useMutation({
    mutationKey: ['closeTask', task.id],
    mutationFn: closeTask,
    onSuccess: sth => {
      setTask(sth);
      onClosePress?.(false);
      modal?.setIsModalVisible(false);
      modal?.modalRef?.current?.close();
      modal?.modalRef?.current?.dismiss();
      updateWorkerTasks(qc, sth, task.id);
    },
    onError: e =>
      Toast.show({
        type: 'error',
        text1: TRANSLATIONS.errorToastTitleClose,
        text2: e.message,
      }),
  });
  const { mutate: pause, isPending: isPausePending } = useMutation({
    mutationKey: ['pauseTask', task.id],
    mutationFn: pauseTask,
    onSuccess: sth => {
      setTask(sth);
      onClosePress?.(false);
      modal?.setIsModalVisible(false);
      modal?.modalRef?.current?.close();
      modal?.modalRef?.current?.dismiss();
      updateWorkerTasks(qc, sth, task.id);
    },
    onError: e =>
      Toast.show({
        type: 'error',
        text1: TRANSLATIONS.errorToastTitleClose,
        text2: e.message,
      }),
  });

  /**
   * ----------------------------------------HANDLERS----------------------------------------
   */
  const handlePause = () =>
    performAction(pause, location.requestCurrentLocation, task.id, {
      header: TRANSLATIONS.locationErrorHeader,
      description: TRANSLATIONS.locationErrorDescription,
    });
  const handleClose = () =>
    performAction(close, location.requestCurrentLocation, task.id, {
      header: TRANSLATIONS.locationErrorHeader,
      description: TRANSLATIONS.locationErrorDescription,
    });

  return (
    <YStack f={1} m="$4" mt="0" mb="10%">
      <YStack f={1} maxHeight="50%">
        <ButtonTamagui
          icon={<PauseIco />}
          isPending={isPausePending}
          buttonProps={{
            onPress: handlePause,
          }}
          text={TRANSLATIONS.pauseButton}
        />
        <ButtonTamagui
          icon={<EndIco />}
          isPending={isClosePending}
          buttonProps={{
            mt: '$2',
            mb: '$2',
            onPress: handleClose,
          }}
          text={TRANSLATIONS.markAsDoneButton}
        />
        <YStack f={1} jc="center">
          <TimeCounter
            startTime={new Date(uncloseSession?.openedAt || Date.now())}
          />
        </YStack>
        <ButtonTamagui
          icon={<EndIco />}
          buttonProps={{
            mt: '$2',
            onPress: () => {
              setIsAutofocused(false);
              mapRef.current?.setNativeProps({
                followsUserLocation: false,
                userLocationFastestInterval:
                  USER_LOCATION_FASTEST_INTERVAL_HIGH,
                userLocationUpdateInterval: USER_LOCATION_UPDATE_INTERVAL_HIGH,
              });
              mapRef.current?.animateToRegion({
                latitude: Number(task.field.address.latitude),
                longitude: Number(task.field.address.longitude),
                latitudeDelta: FOCUS_DELTA,
                longitudeDelta: FOCUS_DELTA,
              });
            },
          }}
          text={TRANSLATIONS.focusOnFieldButton}
        />
      </YStack>
      <Switch
        onPress={() => {
          setIsAutofocused(p => !p);
          if (!isAutofocused) {
            mapRef.current?.setNativeProps({
              followsUserLocation: true,
              userLocationFastestInterval: USER_LOCATION_FASTEST_INTERVAL_HIGH,
              userLocationUpdateInterval: USER_LOCATION_UPDATE_INTERVAL_HIGH,
            });
          } else {
            mapRef.current?.setNativeProps({
              followsUserLocation: false,
              userLocationFastestInterval: USER_LOCATION_FASTEST_INTERVAL_LOW,
              userLocationUpdateInterval: USER_LOCATION_UPDATE_INTERVAL_LOW,
            });
          }
        }}
        checked={isAutofocused}
        label={TRANSLATIONS.autofocusSwitch}
      />
      <YStack f={1} />
    </YStack>
  );
}
