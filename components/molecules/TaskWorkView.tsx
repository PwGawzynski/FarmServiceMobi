import { YStack } from 'tamagui';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import MapView from 'react-native-maps';
import { TaskResponseBase } from '../../FarmServiceApiTypes/Task/Responses';
import { WorkerModalContext } from '../../helepers/context/WorkerModalContext';
import { ButtonTamagui } from '../atoms/ButtonTamagui';
import PauseIco from '../../assets/pause.svg';
import EndIco from '../../assets/circle-check-big.svg';
import { Switch } from '../atoms/Switch';

export interface TaskWorkViewProps {
  task: TaskResponseBase;
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

export function TaskWorkView({
  task,
  mapRef,
  onClosePress,
}: TaskWorkViewProps) {
  const modal = useContext(WorkerModalContext);
  const [isAutofocused, setIsAutofocused] = useState(true);

  return (
    <YStack f={1} m="$4" mt="0" mb="10%">
      <YStack>
        <ButtonTamagui
          icon={<PauseIco />}
          buttonProps={{
            onPress: () => {
              onClosePress?.(false);
              modal?.setIsModalVisible(false);
              modal?.modalRef?.current?.close();
            },
          }}
          text="Pause"
        />
        <ButtonTamagui
          icon={<EndIco />}
          buttonProps={{
            mt: '$2',
            onPress: () => {
              onClosePress?.(false);
              modal?.setIsModalVisible(false);
              modal?.modalRef?.current?.close();
            },
          }}
          text="Mark as done"
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
          text="Focus To Field"
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
        label="Autofocus"
      />
      <YStack f={1} />
    </YStack>
  );
}
