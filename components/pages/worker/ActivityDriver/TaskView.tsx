import { useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Platform } from 'react-native';
import { ScrollView, YStack } from 'tamagui';
import { t } from 'i18next';
import { ScreenBase } from '../../owner/mobi/common/ScreenBase';

import { WorkerActivitiesDriverScreenProps } from '../../../../types/self/navigation/Worker/props/activities/WorkerActivitiesDriverProps';
import { EntityAsACard } from '../../../molecules/EntityAsACard';
import { TaskType } from '../../../../FarmServiceApiTypes/Task/Enums';
import { ButtonTamagui } from '../../../atoms/ButtonTamagui';
import { TranslationNames } from '../../../../locales/TranslationNames';

const TRANSLATIONS = {
  TASK_INFO_CARD: {
    cardName: t(
      TranslationNames.workerScreens.activityDriver.taskView.task_info,
    ),
    createdAt: t(
      TranslationNames.workerScreens.activityDriver.taskView.created_at,
    ),
    closedAt: t(
      TranslationNames.workerScreens.activityDriver.taskView.closed_at,
    ),
    openedAt: t(
      TranslationNames.workerScreens.activityDriver.taskView.opened_at,
    ),
    performanceDate: t(
      TranslationNames.workerScreens.activityDriver.taskView.performance_date,
    ),
    type: t(TranslationNames.workerScreens.activityDriver.taskView.type),
    isDone: t(TranslationNames.workerScreens.activityDriver.taskView.status),
  },
  FIELD_INFO_CARD: {
    cardName: t(
      TranslationNames.workerScreens.activityDriver.taskView.field_info,
    ),
    nameLabel: t(TranslationNames.workerScreens.activityDriver.taskView.name),
    polishSystemId: t(
      TranslationNames.workerScreens.activityDriver.taskView.pl_id,
    ),
    area: t(TranslationNames.workerScreens.activityDriver.taskView.area),
    dateOfCollectionData: t(
      TranslationNames.workerScreens.activityDriver.taskView.doc_data,
    ),
  },
  ADDRESS_INFO_CARD: {
    cardName: t(
      TranslationNames.workerScreens.activityDriver.taskView.address_info,
    ),
    city: t(TranslationNames.workerScreens.activityDriver.taskView.city),
    county: t(TranslationNames.workerScreens.activityDriver.taskView.county),
    longitude: t(
      TranslationNames.workerScreens.activityDriver.taskView.longitude,
    ),
    latitude: t(
      TranslationNames.workerScreens.activityDriver.taskView.latitude,
    ),
    voivodeship: t(
      TranslationNames.workerScreens.activityDriver.taskView.voivodeship,
    ),
  },
};

export function TaskView({
  route: { params },
}: WorkerActivitiesDriverScreenProps<
  'taskView',
  'workerActivityDriver',
  'workerRootDriver'
>) {
  const { task } = params;
  console.log(task);
  const initialState = {
    latitude: Number(task.field.address.latitude) || 37.78825,
    longitude: Number(task.field.address.longitude) || -122.4324,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
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
    <ScreenBase name="TaskView">
      <YStack f={1} mt="$4">
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
          <Marker coordinate={initialState} title={task.field.nameLabel} />
          <ButtonTamagui
            text="Reset Map"
            buttonProps={{
              size: '$2',
              margin: '$2',
              position: 'absolute',
              top: 0,
              left: 0,
              onPress: handleMapReset,
            }}
          />
        </MapView>
      </YStack>
      <YStack f={1} className="mt-4">
        <ScrollView>
          <EntityAsACard
            data={{
              createdAt: new Date(task.createdAt).toLocaleDateString(),
              closedAt: task.closedAt
                ? new Date(task?.closedAt).toLocaleDateString()
                : undefined,
              openedAt: task.openedAt
                ? new Date(task.openedAt).toLocaleDateString()
                : undefined,
              performanceDate: new Date(
                task.performanceDate,
              ).toLocaleDateString(),
              type: TaskType[task.type],
              isDone: task.isDone ? 'Done' : 'Not Done',
            }}
            names={{
              createdAt: TRANSLATIONS.TASK_INFO_CARD.createdAt,
              closedAt: TRANSLATIONS.TASK_INFO_CARD.closedAt,
              openedAt: TRANSLATIONS.TASK_INFO_CARD.openedAt,
              performanceDate: TRANSLATIONS.TASK_INFO_CARD.performanceDate,
              type: TRANSLATIONS.TASK_INFO_CARD.type,
              isDone: TRANSLATIONS.TASK_INFO_CARD.isDone,
            }}
            cardName={TRANSLATIONS.TASK_INFO_CARD.cardName}
          />
          <EntityAsACard
            data={{
              nameLabel: task.field.nameLabel,
              polishSystemId: task.field.polishSystemId,
              area: `${Number(task.field.area).toFixed(2)} Ha`,
              dateOfCollectionData: new Date(
                task.field.dateOfCollectionData,
              ).toLocaleDateString(),
            }}
            names={{
              nameLabel: TRANSLATIONS.FIELD_INFO_CARD.nameLabel,
              polishSystemId: TRANSLATIONS.FIELD_INFO_CARD.polishSystemId,
              area: TRANSLATIONS.FIELD_INFO_CARD.area,
              dateOfCollectionData:
                TRANSLATIONS.FIELD_INFO_CARD.dateOfCollectionData,
            }}
            cardName={TRANSLATIONS.FIELD_INFO_CARD.cardName}
          />
          <EntityAsACard
            data={{
              city: task.field.address.city,
              county: task.field.address.county,
              longitude: task.field.address.longitude,
              latitude: task.field.address.latitude,
              voivodeship: task.field.address.voivodeship,
            }}
            names={{
              city: TRANSLATIONS.ADDRESS_INFO_CARD.city,
              county: TRANSLATIONS.ADDRESS_INFO_CARD.county,
              longitude: TRANSLATIONS.ADDRESS_INFO_CARD.longitude,
              latitude: TRANSLATIONS.ADDRESS_INFO_CARD.latitude,
              voivodeship: TRANSLATIONS.ADDRESS_INFO_CARD.voivodeship,
            }}
            cardName={TRANSLATIONS.ADDRESS_INFO_CARD.cardName}
          />
        </ScrollView>
      </YStack>
    </ScreenBase>
  );
}
