import { useEffect } from 'react';
import { MessageEvent } from 'react-native-event-source';
import { useActor } from '@xstate/react';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch, useSelector } from 'react-redux';
import { SizableText, YStack } from 'tamagui';
import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import { ScreenBase } from '../owner/mobi/common/ScreenBase';
import { WorkerResponseBase } from '../../../FarmServiceApiTypes/Worker/Responses';
import { Api } from '../../../api/Api';
import {
  WorkerRootDriverNavigationProps,
  WorkerRootDriverScreenProps,
} from '../../../types/self/navigation/Worker/props/WorkerRootDriverProps';
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
import {
  ResponseCode,
  ResponseObject,
} from '../../../FarmServiceApiTypes/Respnse/responseGeneric';
import { setWorker } from '../../../src/redux/feature/workerSlice';
import { WelcomeAnimation } from '../../atoms/WelcomeAnimation';
import { PendingInfo } from '../../atoms/PendingInfo';

type ScreenNavigationType = WorkerRootDriverNavigationProps<
  'workerAssignationScreen',
  'ownerRootDriver'
>;

const navigateToWorkerRoot = (navigation: ScreenNavigationType) =>
  navigation.navigate('workerRootDriver', {
    screen: 'workerActivityDriver',
    params: {
      screen: 'workerActivityDesktopRoot',
      params: {
        screen: 'workerLastActivities',
      },
    },
  });

const navigateToWorkerAssignation = (navigation: ScreenNavigationType) =>
  navigation.navigate('workerRootDriver', {
    screen: 'workerAssignationScreen',
  });

export function WorkerAssignation({
  navigation,
}: WorkerRootDriverScreenProps<'workerAssignationScreen', 'workerRootDriver'>) {
  const [state, send] = useActor(AssignationMachine);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  /**
   * SSE Event handlers
   */
  const handleOpenSse = () => {
    send({ type: 'sseOpened' });
  };
  const handleErrorSse = () => send({ type: 'sseError' });
  const handleMessageSse = (message: MessageEvent) => {
    if (message.data) {
      const res = JSON.parse(
        message.data,
      ) as ResponseObject<WorkerResponseBase>;
      if (res.payload && res.code === ResponseCode.ProcessedCorrect) {
        dispatch(setWorker(res.payload));
        send({ type: 'dataReady', data: res.payload });
      }
    }
  };

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ['myId'],
    queryFn: workerData,
    retry: 2,
  });

  useEffect(() => {
    if (data && data.workerData) dispatch(setWorker(data.workerData));
    switch (state.value) {
      case 'QueringWorkerData':
        if (isPending) {
          send({ type: 'Pending' });
        }
        break;
      case 'WorkerQueryPending':
        if (data) {
          send({ type: 'Fetched', data });
        } else if (error) {
          send({ type: 'Error' });
        }
        break;
      case 'sseOpening':
        if (!data?.workerData) {
          Api.workerAssignedListener({
            open: handleOpenSse,
            error: handleErrorSse,
            message: handleMessageSse,
          });
        }
        break;
      case 'ready':
        navigateToWorkerRoot(navigation);
        break;
      case 'workerNotAssigned':
        navigateToWorkerAssignation(navigation);
        break;
      default:
        break;
    }
  }, [state.value, error, isPending, data]);

  const handleRetryButtonPress = () => {
    if (state.value === 'connectionTimeOut') send({ type: 'retry' });
    else {
      send({ type: 'MakeRetry' });
      refetch();
    }
  };

  return (
    <ScreenBase>
      <YStack f={1} jc="center" ai="center" mr="$8" ml="$8">
        {state.value === 'WorkerQueryPending' && (
          <PendingInfo
            isVisible
            infoText={t(
              TranslationNames.screens.workerAssignation.pendingStatus,
            )}
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
        <WelcomeAnimation
          played={state.value === 'workerAssigned' && !!data}
          welcomeText={`${t(
            TranslationNames.screens.workerAssignation.welcomeText,
          )} ${state.context.workerData?.personalData.name}`}
        />
      </YStack>
    </ScreenBase>
  );
}
