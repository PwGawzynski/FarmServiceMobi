import { SizableText, XStack, YStack } from 'tamagui';
import { useMemo } from 'react';
import { Linking, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { t } from 'i18next';
import { KeyValuePair } from '../atoms/KeyValuePair';
import { ButtonTamagui } from '../atoms/ButtonTamagui';
import { TaskSessionResponseBase } from '../../FarmServiceApiTypes/TaskSession/Responses';
import { TranslationNames } from '../../locales/TranslationNames';

export interface TaskSessionManagementProps {
  session: TaskSessionResponseBase;
  onBackToTask?: () => void;
}

const TRANSLATIONS = {
  sessionInfoTitle: t(
    TranslationNames.components.taskSessionManagement.sessionInfoTitle,
  ),
  openedAtLabel: t(
    TranslationNames.components.taskSessionManagement.openedAtLabel,
  ),
  closedAtLabel: t(
    TranslationNames.components.taskSessionManagement.closedAtLabel,
  ),
  onOpenWorkerLatLabel: t(
    TranslationNames.components.taskSessionManagement.onOpenWorkerLatLabel,
  ),
  onOpenWorkerLongLabel: t(
    TranslationNames.components.taskSessionManagement.onOpenWorkerLongLabel,
  ),
  onCloseWorkerLatLabel: t(
    TranslationNames.components.taskSessionManagement.onCloseWorkerLatLabel,
  ),
  onCloseWorkerLongLabel: t(
    TranslationNames.components.taskSessionManagement.onCloseWorkerLongLabel,
  ),
  backButton: t(TranslationNames.components.taskSessionManagement.backButton),
  openStartOnMapButton: t(
    TranslationNames.components.taskSessionManagement.openStartOnMapButton,
  ),
  openEndOnMapButton: t(
    TranslationNames.components.taskSessionManagement.openEndOnMapButton,
  ),
  workerOnOpenLabel: t(
    TranslationNames.components.taskSessionManagement.workerOnOpenLabel,
  ),
  workerOnCloseLabel: t(
    TranslationNames.components.taskSessionManagement.workerOnCloseLabel,
  ),
  toastOpenMapErrorHeader: t(
    TranslationNames.components.taskSessionManagement.toastOpenMapErrorHeader,
  ),
  toastOpenMapErrorDescription: t(
    TranslationNames.components.taskSessionManagement
      .toastOpenMapErrorDescription,
  ),
};

const IOS_MAPS_OPEN_MARK = 'maps:0,0?q=';
const ANDROID_MAPS_OPEN_MARK = 'geo:0,0?q=';
export function TaskSessionManagement({
  session,
  onBackToTask,
}: TaskSessionManagementProps) {
  const openAddressOnMap = useMemo(
    () => (label: string, lat: string, lng: string) => {
      const scheme = Platform.select({
        ios: IOS_MAPS_OPEN_MARK,
        android: ANDROID_MAPS_OPEN_MARK,
      });
      const latLng = `${lat},${lng}`;
      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      });
      Linking.openURL(url || '').catch(() => {
        Toast.show({
          type: 'error',
          text1: TRANSLATIONS.toastOpenMapErrorHeader,
          text2: TRANSLATIONS.toastOpenMapErrorDescription,
        });
      });
    },
    [],
  );

  return (
    <YStack f={1} p="$4" pt="$0">
      <YStack f={1} maxHeight="50%">
        <YStack f={1}>
          <SizableText fontSize="$7" className="uppercase font-bold mb-2">
            {TRANSLATIONS.sessionInfoTitle}
          </SizableText>
          <KeyValuePair
            name={TRANSLATIONS.openedAtLabel}
            value={new Date(session.openedAt).toLocaleTimeString()}
          />
          <KeyValuePair
            name={TRANSLATIONS.closedAtLabel}
            value={
              session.closedAt
                ? new Date(session.closedAt).toLocaleTimeString()
                : 'N/A'
            }
          />
          <KeyValuePair
            name={TRANSLATIONS.onOpenWorkerLatLabel}
            value={session.onOpenWorkerLatitude}
          />
          <KeyValuePair
            name={TRANSLATIONS.onOpenWorkerLongLabel}
            value={session.onOpenWorkerLongitude}
          />
          <KeyValuePair
            name={TRANSLATIONS.onCloseWorkerLatLabel}
            value={session.onCloseWorkerLatitude}
          />
          <KeyValuePair
            name={TRANSLATIONS.onCloseWorkerLongLabel}
            value={session.onCloseWorkerLongitude}
          />
        </YStack>
        <ButtonTamagui
          text={TRANSLATIONS.backButton}
          buttonProps={{
            mt: '$4',
            onPress: onBackToTask,
          }}
        />
        <XStack mt="$4">
          <ButtonTamagui
            text={TRANSLATIONS.openStartOnMapButton}
            textProps={{
              fontSize: '$2',
            }}
            buttonProps={{
              flex: 1,
              mr: session.closedAt ? '$2' : '$0',
              onPress: () =>
                openAddressOnMap(
                  TRANSLATIONS.openEndOnMapButton,
                  session.onOpenWorkerLatitude as string,
                  session.onOpenWorkerLongitude as string,
                ),
            }}
          />
          {session.closedAt && (
            <ButtonTamagui
              text={TRANSLATIONS.openEndOnMapButton}
              textProps={{
                fontSize: '$2',
              }}
              buttonProps={{
                flex: 1,
                onPress: () =>
                  openAddressOnMap(
                    TRANSLATIONS.workerOnCloseLabel,
                    session.onCloseWorkerLatitude as string,
                    session.onCloseWorkerLongitude as string,
                  ),
              }}
            />
          )}
        </XStack>
      </YStack>
    </YStack>
  );
}
