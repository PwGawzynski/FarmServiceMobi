import { Card, SizableText, useTheme, XStack, YStack } from 'tamagui';
import i18next, { t } from 'i18next';
import { Colors } from '../../settings/styles/colors';
import { ActivityResponseBase } from '../../FarmServiceApiTypes/Activity/Responses';
import { ActivityType } from '../../FarmServiceApiTypes/Activity/Enums';
import { TranslationNames } from '../../locales/TranslationNames';
import TimerStopIco from '../../assets/timer-off.svg';
import TimerStartIco from '../../assets/timer.svg';
import PowerOffIco from '../../assets/power-off.svg';
import PowerOnIco from '../../assets/power.svg';

function produceActivityText(activity: ActivityResponseBase) {
  const lang = i18next.language;
  if (lang === 'pl') {
    switch (activity.type) {
      case ActivityType.CLOSE_SESSION:
        return `${t(TranslationNames.sessionAsActivity.worker)} ${
          activity.causerShortcutData.name
        } ${activity.causerShortcutData.surname} ${t(
          TranslationNames.sessionAsActivity.closed,
        )} ${t(TranslationNames.sessionAsActivity.aSessionOnAField)} ${
          activity.fieldShortcutData.nameLabel
        }`;
      case ActivityType.OPEN_SESSION:
        return `${t(TranslationNames.sessionAsActivity.worker)} ${
          activity.causerShortcutData.name
        } ${activity.causerShortcutData.surname} ${t(
          TranslationNames.sessionAsActivity.opened,
        )} ${t(TranslationNames.sessionAsActivity.aSessionOnAField)} ${
          activity.fieldShortcutData.nameLabel
        }`;
      case ActivityType.CLOSE_TASK:
        return `${t(TranslationNames.sessionAsActivity.worker)} ${
          activity.causerShortcutData.name
        } ${activity.causerShortcutData.surname} ${t(
          TranslationNames.sessionAsActivity.closed,
        )} ${t(TranslationNames.sessionAsActivity.workOnAField)} ${
          activity.fieldShortcutData.nameLabel
        }`;
      case ActivityType.OPEN_TASK:
        return `${t(TranslationNames.sessionAsActivity.worker)} ${
          activity.causerShortcutData.name
        } ${activity.causerShortcutData.surname} ${t(
          TranslationNames.sessionAsActivity.opened,
        )} ${t(TranslationNames.sessionAsActivity.workOnAField)} ${
          activity.fieldShortcutData.nameLabel
        }`;
      default:
        return TranslationNames.sessionAsActivity.somethingWentWrong;
    }
  } else {
    switch (activity.type) {
      case ActivityType.CLOSE_SESSION:
        return `${t(TranslationNames.sessionAsActivity.worker)} ${
          activity.causerShortcutData.name
        } ${activity.causerShortcutData.surname} ${t(
          TranslationNames.sessionAsActivity.has,
        )} ${t(TranslationNames.sessionAsActivity.closed)} ${t(
          TranslationNames.sessionAsActivity.aSessionOnAField,
        )} ${activity.fieldShortcutData.nameLabel}`;
      case ActivityType.OPEN_SESSION:
        return `${t(TranslationNames.sessionAsActivity.worker)} ${
          activity.causerShortcutData.name
        } ${activity.causerShortcutData.surname} ${t(
          TranslationNames.sessionAsActivity.has,
        )} ${t(TranslationNames.sessionAsActivity.opened)} ${t(
          TranslationNames.sessionAsActivity.aSessionOnAField,
        )} ${activity.fieldShortcutData.nameLabel}`;
      case ActivityType.CLOSE_TASK:
        return `${t(TranslationNames.sessionAsActivity.worker)} ${
          activity.causerShortcutData.name
        } ${activity.causerShortcutData.surname} ${t(
          TranslationNames.sessionAsActivity.has,
        )} ${t(TranslationNames.sessionAsActivity.closed)} ${t(
          TranslationNames.sessionAsActivity.workOnAField,
        )} ${activity.fieldShortcutData.nameLabel}`;
      case ActivityType.OPEN_TASK:
        return `${t(TranslationNames.sessionAsActivity.worker)} ${
          activity.causerShortcutData.name
        } ${activity.causerShortcutData.surname} ${t(
          TranslationNames.sessionAsActivity.has,
        )} ${t(TranslationNames.sessionAsActivity.opened)} ${t(
          TranslationNames.sessionAsActivity.workOnAField,
        )} ${activity.fieldShortcutData.nameLabel}`;
      default:
        return TranslationNames.sessionAsActivity.somethingWentWrong;
    }
  }
}

function produceIcon(activity: ActivityResponseBase, color: string) {
  switch (activity.type) {
    case ActivityType.CLOSE_SESSION:
      return <TimerStopIco height="100%" width="100%" color={color} />;
    case ActivityType.OPEN_SESSION:
      return <TimerStartIco height="100%" width="100%" color={color} />;
    case ActivityType.CLOSE_TASK:
      return <PowerOffIco height="100%" width="100%" color={color} />;
    case ActivityType.OPEN_TASK:
      return <PowerOnIco height="100%" width="100%" color={color} />;
    default:
      return null;
  }
}

function produceHeader(type: ActivityType) {
  switch (type) {
    case ActivityType.CLOSE_SESSION:
      return t(TranslationNames.sessionAsActivity.closeSessionTitle);
    case ActivityType.OPEN_SESSION:
      return t(TranslationNames.sessionAsActivity.openSessionTitle);
    case ActivityType.CLOSE_TASK:
      return t(TranslationNames.sessionAsActivity.closeTask);
    case ActivityType.OPEN_TASK:
      return t(TranslationNames.sessionAsActivity.openTask);
    default:
      return '';
  }
}

export interface ActivityItemProps {
  item: ActivityResponseBase;
}

export function ActivityItem({ item }: ActivityItemProps) {
  const { color4 } = useTheme();

  return (
    <Card h={60}>
      <XStack
        style={{
          paddingTop: 5,
          paddingRight: 5,
          borderLeftWidth: 10,
          borderRadius: 5,
          borderLeftColor: Colors.GREEN,
          color: '$color4',
        }}
        f={1}
      >
        <YStack ml="$2" f={1} maxWidth="10%" ai="center" jc="center">
          {produceIcon(item, color4.val)}
        </YStack>
        <YStack f={1} ml="$2">
          <XStack jc="space-between">
            <SizableText className="uppercase font-bold">
              {produceHeader(item.type)}
            </SizableText>
            <SizableText className="text-white dark:text-dark-gray">
              {new Date(item.actionDate).toLocaleTimeString()}
            </SizableText>
          </XStack>
          <SizableText className="text-white dark:text-dark-gray">
            {produceActivityText(item)}
          </SizableText>
        </YStack>
      </XStack>
    </Card>
  );
}
