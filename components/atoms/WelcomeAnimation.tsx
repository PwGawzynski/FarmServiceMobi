import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { SizableText, YStack } from 'tamagui';
import { useSelector } from 'react-redux';
import HandShakeIco from '../../assets/handshake.svg';
import { selectTheme } from '../../src/redux/feature/userSlice';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../settings/styles/colors';

export type HandShakeAnimationProps = {
  played: boolean;
  welcomeText: string;
};

export function WelcomeAnimation({
  played,
  welcomeText,
}: HandShakeAnimationProps) {
  const rotate = useSharedValue(-20);
  const opacity = useSharedValue(0);
  const handShakeAnimation = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
    opacity: opacity.value,
  }));
  const theme = useSelector(selectTheme);
  if (played) {
    rotate.value = withRepeat(withTiming(20, { duration: 800 }), -1, true);
    opacity.value = withTiming(1, { duration: 1000 });
  } else return null;
  return (
    <YStack f={1} jc="center" ai="center" className="flex-col">
      <Animated.View style={[handShakeAnimation]} className="w-32 h-32">
        <HandShakeIco
          width="100%"
          height="100%"
          color={theme === Theme.dark ? Colors.GREEN : Colors.DARK_BLUE}
        />
      </Animated.View>
      <SizableText
        textAlign="center"
        className="text-lg uppercase font-bold mt-8"
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {welcomeText}
      </SizableText>
    </YStack>
  );
}
