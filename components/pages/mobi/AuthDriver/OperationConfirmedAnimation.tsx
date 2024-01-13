import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio/Sound';
import { useSelector } from 'react-redux';
import CheckIco from '../../../../assets/check.svg';
import { AuthDriverProps } from '../../../../types/self/navigation/props/AuthDriverProps';
import { ScreenBase } from '../common/ScreenBase';
import { selectTheme } from '../../../../src/redux/feature/userSlice';
import { Theme } from '../../../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../../../settings/styles/colors';

const ANIMATION_START_DELAY = 1000;
const ANIMATION_DURATION = 2000;
const REDIRECT_DELAY = 3000;

export function OperationConfirmedAnimation({
  navigation,
  route,
}: AuthDriverProps<'OperationConfirmed'>) {
  const { shownMessage, redirectScreenName, goBack, payload } = route.params;

  const theme = useSelector(selectTheme);

  const opacity = useSharedValue(0);
  const [animationStart, setAnimationStart] = useState(false);

  const [acceptBell, setAcceptBell] = useState<Sound | undefined>();
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  useEffect(() => {
    if (!acceptBell) {
      (async () => {
        const { sound } = await Audio.Sound.createAsync(
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require('../../../../assets/beep.mp3'),
        );
        setAcceptBell(sound);
      })();
    }
  }, []);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setAnimationStart(true);
    }, ANIMATION_START_DELAY);
    const interval2Id = setTimeout(() => {
      if (goBack) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        navigation.navigate(redirectScreenName as any, payload);
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigation.navigate(redirectScreenName as any);
    }, REDIRECT_DELAY);
    return () => {
      clearInterval(intervalId);
      clearInterval(interval2Id);
    };
  }, [acceptBell]);

  useEffect(() => {
    return acceptBell
      ? () => {
          acceptBell.unloadAsync();
        }
      : undefined;
  }, [acceptBell]);

  useEffect(() => {
    acceptBell?.playAsync();
    opacity.value = withTiming(1, { duration: ANIMATION_DURATION });
  }, [animationStart]);

  return (
    <ScreenBase>
      <View className="w-full h-full items-center justify-center flex flex-col">
        <View className="flex-1 justify-end">
          <Animated.View
            style={[
              {
                overflow: 'hidden',
                justifyContent: 'flex-end',
              },
              animatedStyle,
            ]}
          >
            <CheckIco
              color={theme === Theme.dark ? Colors.GREEN : Colors.DARK}
              style={{
                minWidth: 100,
                minHeight: 100,
              }}
            />
          </Animated.View>
        </View>
        <View className="flex-1 w-3/4 mt-4">
          <Text className="w-max text-dark dark:text-green text-lg text-center font-bold uppercase">
            {shownMessage}
          </Text>
        </View>
      </View>
    </ScreenBase>
  );
}
