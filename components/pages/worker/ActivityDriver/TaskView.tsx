import { useContext, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { YStack } from 'tamagui';
import { t } from 'i18next';
import { ScreenBase } from '../../owner/mobi/common/ScreenBase';
import { WorkerActivitiesDriverScreenProps } from '../../../../types/self/navigation/Worker/props/activities/WorkerActivitiesDriverProps';
import { ButtonTamagui } from '../../../atoms/ButtonTamagui';
import { WorkerModalContext } from '../../../../helepers/context/WorkerModalContext';
import { TaskWorkView } from '../../../molecules/TaskWorkView';
import { MapContainer } from '../../../molecules/MapContainer';
import { TaskInfoPanel } from '../../../atoms/TaskInfoPanel';
import { TranslationNames } from '../../../../locales/TranslationNames';

export interface OpenedTaskSettingsI {
  isOpened: boolean;
  userLocationUpdateInterval?: number | 5000;
  userLocationFastestInterval?: number | 5000;
  followUserLocation?: boolean;
  setMapTo?: {
    latitude: number;
    longitude: number;
  };
}

const TRANSLATIONS = {
  screenTitle: t(
    TranslationNames.workerScreens.activityDriver.taskView.screenTitle,
  ),
  openButton: t(
    TranslationNames.workerScreens.activityDriver.taskView.openButton,
  ),
  resumeButton: t(
    TranslationNames.workerScreens.activityDriver.taskView.resumeButton,
  ),
};

export function TaskView({
  route: { params },
}: WorkerActivitiesDriverScreenProps<
  'taskView',
  'workerActivityDriver',
  'workerRootDriver'
>) {
  const { task } = params;
  const modal = useContext(WorkerModalContext);
  const mapRef = useRef<MapView>(null);
  const [taskOpened, setTaskOpened] = useState<boolean>(false);
  return (
    <ScreenBase name={TRANSLATIONS.screenTitle}>
      <YStack f={1} mt="$4">
        <MapContainer
          mapRef={mapRef}
          scaleUp={taskOpened}
          initialCords={{
            latitude: Number(task.field.address.latitude),
            longitude: Number(task.field.address.longitude),
          }}
          Marker={
            <Marker
              coordinate={{
                latitude: Number(task.field.address.latitude),
                longitude: Number(task.field.address.longitude),
              }}
              title={task.field.nameLabel}
            />
          }
        />
      </YStack>
      <TaskInfoPanel translateY={taskOpened} task={task} />

      <YStack>
        <ButtonTamagui
          text={TRANSLATIONS.openButton}
          buttonProps={{
            mb: '$4',
            onPress: () => {
              modal?.modalRef?.current?.present(
                <TaskWorkView
                  onClosePress={setTaskOpened}
                  mapRef={mapRef}
                  task={task}
                />,
              );
              setTaskOpened(true);
              modal?.setIsModalVisible(true);
            },
          }}
        />
      </YStack>
    </ScreenBase>
  );
}
