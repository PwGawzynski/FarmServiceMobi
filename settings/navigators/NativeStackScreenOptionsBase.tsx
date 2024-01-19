import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const NativeStackScreenOptionsBase = {
  gestureDirection: 'vertical',
  headerShown: false,
  gestureEnabled: true,
  animation: 'slide_from_bottom',
  fullScreenGestureEnabled: true,
  customAnimationOnGesture: true,
} as NativeStackNavigationOptions;
