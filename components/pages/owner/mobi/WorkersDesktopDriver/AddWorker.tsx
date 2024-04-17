import { SizableText, XStack, YStack } from 'tamagui';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import {
  handleBarCodeScannedData,
  QRScanner,
} from '../../../../molecules/QRScanner';
import { assignWorker } from '../../../../../api/worker/Worker';
import { PendingInfo } from '../../../../atoms/PendingInfo';
import { WelcomeAnimation } from '../../../../atoms/WelcomeAnimation';
import { WorkersDesktopDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/workers/WorkersDesktopDriverProps';
import { WorkerResponseBase } from '../../../../../FarmServiceApiTypes/Worker/Responses';
import { TranslationNames } from '../../../../../locales/TranslationNames';

const WELCOME_ANIMATION_DURATION = 3000;

const TRANSLATIONS = {
  screenTitle: t(
    TranslationNames.screens.ownerRootDriver.addWorker.screenTitle,
  ),
  scanQrCode: t(TranslationNames.screens.ownerRootDriver.addWorker.scanQrCode),
  pendingStatus: t(
    TranslationNames.screens.ownerRootDriver.addWorker.pendingStatus,
  ),
  welcomeAnimationStartText: t(
    TranslationNames.screens.ownerRootDriver.addWorker
      .welcomeAnimationStartText,
  ),
  welcomeAnimationEndText: t(
    TranslationNames.screens.ownerRootDriver.addWorker.welcomeAnimationEndText,
  ),
};

export function AddWorker({
  navigation,
  route: { params },
}: WorkersDesktopDriverScreenProps<
  'addWorker',
  'workersDesktopRoot',
  'workersDriver',
  'ownerRootDriver'
>) {
  const [scanned, setScanned] = useState(false);
  const queryClient = useQueryClient();
  const {
    mutate: createNewWorker,
    data: worker,
    isPending,
    reset: resetWorker,
  } = useMutation({
    mutationFn: assignWorker,
    onSuccess: responseData => {
      queryClient.setQueryData(
        ['workers'],
        (oldData: Array<WorkerResponseBase>) => {
          return oldData ? [...oldData, responseData] : [responseData];
        },
      );
    },
  });
  const handleQrScanned = ({ data }: handleBarCodeScannedData) => {
    createNewWorker({ user: data });
    setScanned(true);
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      setScanned(false);
      resetWorker();
    }
    let timeout: NodeJS.Timeout;
    if (worker && !params?.goBack) {
      timeout = setTimeout(
        () => navigation.navigate('workersDesktop'),
        WELCOME_ANIMATION_DURATION,
      );
    } else if (worker && params?.goBack) {
      navigation.goBack();
    }
    return () => clearTimeout(timeout);
  }, [isFocused, worker]);

  return (
    <ScreenBase name={TRANSLATIONS.screenTitle}>
      <YStack f={1} ai="center" jc="center">
        {!worker && (
          <XStack ai="center" jc="center" f={1}>
            <XStack className="w-52 h-52 rounded-lg dark:border-green border-2 overflow-hidden ">
              {isFocused && (
                <QRScanner
                  scanned={scanned}
                  handleBarCodeScanned={handleQrScanned}
                />
              )}
            </XStack>
          </XStack>
        )}
        <XStack ai="center" jc="center" f={1}>
          {!scanned && (
            <SizableText className="mt-8 text-lg uppercase ">
              {TRANSLATIONS.scanQrCode}
            </SizableText>
          )}
          {isPending && (
            <PendingInfo
              isVisible
              infoText={TRANSLATIONS.pendingStatus}
              size="large"
              column
            />
          )}
          <WelcomeAnimation
            played={!!worker}
            welcomeText={`${TRANSLATIONS.welcomeAnimationStartText} ${worker?.personalData.name} ${TRANSLATIONS.welcomeAnimationEndText}`}
          />
        </XStack>
      </YStack>
    </ScreenBase>
  );
}
