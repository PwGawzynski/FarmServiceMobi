import { memo, useMemo } from 'react';
import { Card, ScrollView, SizableText, YGroup } from 'tamagui';
import { t } from 'i18next';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { TaskResponseBase } from '../../FarmServiceApiTypes/Task/Responses';
import { EntityAsACard } from '../molecules/EntityAsACard';
import { TaskType } from '../../FarmServiceApiTypes/Task/Enums';
import { TranslationNames } from '../../locales/TranslationNames';
import { TaskSessionItem } from './TaskSessionItem';
import { MAP_ANIMATION_DURATION } from '../../settings/map/defaults';

const TRANSLATIONS = {
  TASK_INFO_CARD: {
    cardName: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel
        .task_info,
    ),
    createdAt: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel
        .created_at,
    ),
    closedAt: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel
        .closed_at,
    ),
    openedAt: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel
        .opened_at,
    ),
    performanceDate: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel
        .performance_date,
    ),
    type: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel.type,
    ),
    isDone: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel
        .status,
    ),
  },
  FIELD_INFO_CARD: {
    cardName: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel
        .field_info,
    ),
    nameLabel: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel.name,
    ),
    polishSystemId: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel
        .pl_id,
    ),
    area: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel.area,
    ),
    dateOfCollectionData: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel
        .doc_data,
    ),
  },
  ADDRESS_INFO_CARD: {
    cardName: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel
        .address_info,
    ),
    city: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel.city,
    ),
    county: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel
        .county,
    ),
    longitude: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel
        .longitude,
    ),
    latitude: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel
        .latitude,
    ),
    voivodeship: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel
        .voivodeship,
    ),
  },
  SESSIONS_CARD: {
    sessionsCardTitle: t(
      TranslationNames.workerScreens.activityDriver.taskView.taskInfoPanel
        .sessions,
    ),
  },
};
export interface TaskInfoPanelProps {
  task: TaskResponseBase;
  translateY?: boolean;
  leadingChildren?: JSX.Element;
  footerChildren?: JSX.Element;
}
const TaskInfoPanelM = memo(
  ({
    task,
    translateY,
    leadingChildren,
    footerChildren,
  }: TaskInfoPanelProps) => {
    const position = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: position.value }],
    }));
    const sessions = useMemo(
      () =>
        task.sessions
          .sort((a, b) =>
            new Date(a.openedAt).getTime() < new Date(b.openedAt).getTime()
              ? 1
              : -1,
          )
          .map(session => (
            <TaskSessionItem session={session} key={Math.random()} />
          )),
      [task.sessions],
    );
    if (translateY)
      position.value = withTiming(120, { duration: MAP_ANIMATION_DURATION });
    else position.value = withTiming(0, { duration: MAP_ANIMATION_DURATION });
    return (
      <Animated.View
        style={[
          {
            flex: 1,
          },
          animatedStyle,
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false} mt="$4">
          {leadingChildren}
          <Card bordered p="$2">
            <SizableText fontSize="$7" className="uppercase font-bold">
              {TRANSLATIONS.SESSIONS_CARD.sessionsCardTitle}
            </SizableText>
            <YGroup>{sessions}</YGroup>
          </Card>
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
          {footerChildren}
        </ScrollView>
      </Animated.View>
    );
  },
  (p, n) =>
    p.translateY === n.translateY && p.leadingChildren === n.leadingChildren,
);
TaskInfoPanelM.displayName = 'TaskInfoPanel';
export const TaskInfoPanel = TaskInfoPanelM;
