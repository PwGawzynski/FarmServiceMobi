import { useEffect } from 'react';
import { MessageEvent } from 'react-native-event-source';
import { useActor } from '@xstate/react';
import QRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';
import { SizableText, YStack } from 'tamagui';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator } from 'react-native';
import { t } from 'i18next';
import { ScreenBase } from '../owner/mobi/common/ScreenBase';
import { WorkerResponseBase } from '../../../FarmServiceApiTypes/Worker/Responses';
import { Api } from '../../../api/Api';
import { WorkerRootDriverScreenProps } from '../../../types/self/navigation/Worker/props/WorkerRootDriverProps';
import { Colors } from '../../../settings/styles/colors';
import { selectTheme } from '../../../src/redux/feature/userSlice';
import { Theme } from '../../../FarmServiceApiTypes/Account/Constants';
import { workerData } from '../../../api/worker/Worker';
import { CountdownBar } from '../../atoms/CountdownBar';
import { ButtonTamagui } from '../../atoms/ButtonTamagui';
import Refresh from '../../../assets/refresh.svg';
import {
  AssignationMachine,
  SSE_TIMEOUT,
} from '../../../helepers/StateMachines/AssignationMachine';
import { matchesAny } from '../../../helepers/StateMachines/MatchesAny';
import { TranslationNames } from '../../../locales/TranslationNames';

export function WorkerAssignation({
  navigation,
}: WorkerRootDriverScreenProps<'workerAssignationScreen', 'workerRootDriver'>) {
  const [state, send] = useActor(AssignationMachine);
  const theme = useSelector(selectTheme);

  /**
   * SSE Event handlers
   */
  const handleOpenSse = () => {
    send({ type: 'sseOpened' });
  };
  const handleErrorSse = () => send({ type: 'sseError' });
  const handleMessageSse = (message: MessageEvent) => {
    if (message.data) {
      const res = JSON.parse(message.data) as WorkerResponseBase;
      send({ type: 'dataReady', data: res });
    }
  };

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ['myId'],
    queryFn: workerData,
    retry: 2,
  });
  useEffect(() => {
    if (state.value === 'QueringWorkerData' || isPending)
      send({ type: 'Pending' });
    if (state.value === 'WorkerQueryPending' && data)
      send({ type: 'Fetched', data });
    if (state.value === 'WorkerQueryPending' && error) send({ type: 'Error' });

    if (state.value === 'sseOpening' && !data?.workerData) {
      Api.workerAssignedListener({
        open: handleOpenSse,
        error: handleErrorSse,
        message: handleMessageSse,
      });
    }
    if (state.matches('workerAssigned')) {
      navigation.navigate('workerRootDriver', {
        screen: 'workerActivityDriver',
        params: {
          screen: 'workerActivityDesktopRoot',
          params: {
            screen: 'workerLastActivities',
          },
        },
      });
    } else if (state.matches('workerNotAssigned')) {
      navigation.navigate('workerRootDriver', {
        screen: 'workerAssignationScreen',
      });
    }
  }, [state.value, error, isPending, data]);

  const handleRetryButtonPress = () => {
    if (state.value === 'connectionTimeOut') send({ type: 'retry' });
    else {
      send({ type: 'MakeRetry' });
      refetch();
    }
  };

  console.log(state.value);
  return (
    <ScreenBase>
      <YStack f={1} jc="center" ai="center" mr="$8" ml="$8">
        {state.value === 'WorkerQueryPending' && (
          <ActivityIndicator
            size="large"
            color={theme === Theme.dark ? Colors.GREEN : Colors.DARK_BLUE}
          />
        )}
        {state.value === 'sseOpened' && data?.userId && (
          <>
            <QRCode
              size={200}
              color={theme === Theme.dark ? Colors.GREEN : Colors.DARK_BLUE}
              backgroundColor={theme ? Colors.DARK : Colors.WHITE}
              value={data.userId}
            />

            <SizableText mt="$8" textAlign="center">
              {t(
                TranslationNames.screens.workerAssignation
                  .qrCodeScanCommunication,
              )}
            </SizableText>
            <SizableText mt="$8" mb="$8" textAlign="center" size="$4">
              {t(TranslationNames.screens.workerAssignation.qrCodeTimeOut)}
            </SizableText>
            <CountdownBar time={SSE_TIMEOUT} />
          </>
        )}
        {matchesAny(
          state,
          'sseError',
          'FetchingError',
          'connectionTimeOut',
        ) && (
          <YStack justifyContent="space-between">
            <YStack f={1} jc="center" ai="center">
              <SizableText textAlign="center" size="$4">
                {state.value === 'connectionTimeOut'
                  ? t(
                      TranslationNames.screens.workerAssignation
                        .connectionTimeout,
                    )
                  : t(TranslationNames.screens.workerAssignation.error)}
              </SizableText>
            </YStack>
            <ButtonTamagui
              icon={<Refresh />}
              text={t(TranslationNames.screens.workerAssignation.retryButton)}
              buttonProps={{
                onPress: () => handleRetryButtonPress(),
              }}
            />
          </YStack>
        )}
      </YStack>
    </ScreenBase>
  );
}
