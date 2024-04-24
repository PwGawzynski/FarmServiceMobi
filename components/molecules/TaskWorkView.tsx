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

export interface TaskWorkViewProps {
  task: TaskResponseBase;
  setTask: Dispatch<SetStateAction<TaskResponseBase>>;
  mapRef: React.RefObject<MapView>;
  onClosePress?: Dispatch<SetStateAction<boolean>>;
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
};

export function TaskWorkView({
  task,
  mapRef,
  onClosePress,
  setTask,
}: TaskWorkViewProps) {
  const modal = useContext(WorkerModalContext);
  const [isAutofocused, setIsAutofocused] = useState(true);
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
      onClosePress?.(false);
      modal?.setIsModalVisible(false);
      modal?.modalRef?.current?.close();
      modal?.modalRef?.current?.dismiss();
      updateWorkerTasks(qc, sth, task.id);
      setTask(sth);
    },
    onError: e =>
      Toast.show({
        type: 'error',
        text1: TRANSLATIONS.errorToastTitleClose,
        text2: e.message,
      }),
  });

  return (
    <YStack f={1} m="$4" mt="0" mb="10%">
      <YStack>
        <ButtonTamagui
          icon={<PauseIco />}
          isPending={isPausePending}
          buttonProps={{
            onPress: () => pause(task.id),
          }}
          text={TRANSLATIONS.pauseButton}
        />
        <ButtonTamagui
          icon={<EndIco />}
          isPending={isClosePending}
          buttonProps={{
            mt: '$2',
            onPress: () => close(task.id),
          }}
          text={TRANSLATIONS.markAsDoneButton}
        />
        <ButtonTamagui
          icon={<EndIco />}
          buttonProps={{
            mt: '$2',
            onPress: () => {
              setIsAutofocused(false);
              mapRef.current?.setNativeProps({
                followsUserLocation: false,
                userLocationFastestInterval: 1000,
                userLocationUpdateInterval: 1000,
              });
              mapRef.current?.animateToRegion({
                latitude: Number(task.field.address.latitude),
                longitude: Number(task.field.address.longitude),
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
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
              userLocationFastestInterval: 1000,
              userLocationUpdateInterval: 1000,
            });
          } else {
            mapRef.current?.setNativeProps({
              followsUserLocation: false,
              userLocationFastestInterval: 5000,
              userLocationUpdateInterval: 5000,
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
