import { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { SizableText, YStack } from 'tamagui';
import { useMachine } from '@xstate/react';
import { t } from 'i18next';
import { ClientResponseBase } from '../../../../../FarmServiceApiTypes/Clients/Responses';
import { ScreenBase } from '../common/ScreenBase';
import { ClientList } from '../../../../organisms/ClientList';
import { addOrderMachine } from '../../../../../helepers/StateMachines/AddOrderMachine';
import { OrdersDesktopDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDesktopDriverProps';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { OrderForm } from '../../../../organisms/OrderForm';

const ANIMATION_DURATION = 1000;

export function AddOrder({
  route: { params },
}: OrdersDesktopDriverScreenProps<
  'addOrder',
  'ordersDesktopRoot',
  'ordersDriver',
  'ownerRootDriver'
>) {
  const [client, setClient] = useState<ClientResponseBase>();
  const fadeAnim = useSharedValue(0);
  const fadeOutAnim = useSharedValue(1);
  const fadeInAnim = useSharedValue(0);
  const [state, send] = useMachine(addOrderMachine);
  console.log(state, 'state');

  useEffect(() => {
    if (state.value === 'Idle') send({ type: 'init', data: params?.client });
    if (state.value === 'WaitingTillClientIsGiven')
      fadeAnim.value = withRepeat(
        withSequence(
          withTiming(1, { duration: ANIMATION_DURATION }),
          withTiming(0, { duration: ANIMATION_DURATION }),
        ),
        -1,
        false,
      );
    if (state.value === 'ChangeStates') {
      fadeOutAnim.value = withTiming(0, { duration: ANIMATION_DURATION });
    }
    if (state.value === 'ClientGiven') {
      fadeInAnim.value = withTiming(1, { duration: ANIMATION_DURATION / 1.3 });
    }
  }, [state.value]);

  useEffect(() => {
    if (client) send({ type: 'setClient', data: client });
  }, [client]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });
  const fadeOutStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeOutAnim.value,
      display: fadeOutAnim.value === 0 ? 'none' : 'flex',
    };
  });
  const fadeInStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeInAnim.value,
    };
  });

  const onAddOrderSuccess = () => {
    fadeOutAnim.value = withTiming(1, {
      duration: ANIMATION_DURATION,
    });
    setClient(undefined);
    send({ type: 'reset', data: undefined });
  };

  return (
    <ScreenBase
      name={t(
        TranslationNames.screens.ordersDesktopDriver.addOrder.screenTitle,
      )}
    >
      <Animated.View style={[fadeOutStyle, { flex: 1 }]}>
        <YStack f={1}>
          <Animated.View style={animatedStyle}>
            <SizableText color="$color10" className="uppercase text-lg mt-4">
              {t(
                TranslationNames.screens.ordersDesktopDriver.addOrder
                  .step1Communicat,
              )}
            </SizableText>
          </Animated.View>
          <ClientList optionalOnPress={setClient} />
        </YStack>
      </Animated.View>
      {state.value === 'ClientGiven' && client && (
        <Animated.View style={[fadeInStyle, { flex: 1 }]}>
          <YStack f={1}>
            <SizableText color="$color10" className="uppercase text-lg mt-4">
              {t(
                TranslationNames.screens.ordersDesktopDriver.addOrder
                  .step2Communicat,
              )}
            </SizableText>
            <OrderForm client={client} onSuccess={onAddOrderSuccess} />
          </YStack>
        </Animated.View>
      )}
    </ScreenBase>
  );
}
