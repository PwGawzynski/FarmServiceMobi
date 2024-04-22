import React, { useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { YStack } from 'tamagui';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  LinearTransition,
} from 'react-native-reanimated';
import {
  MainBottomSheet,
  MainBottomSheetProps,
} from '../../../../organisms/BottomSheet';

export type Props = {
  name?: string;
  children?: React.ReactNode;
  activityDot?: boolean;
  bottomSheetsProps?: MainBottomSheetProps;
  switchOfMargins?: boolean;
};

export function ScreenBase({
  name,
  children,
  activityDot,
  bottomSheetsProps,
  switchOfMargins,
}: Props) {
  return (
    <SafeAreaView
      className="flex-1 bg-[#fff] dark:bg-dark"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <BottomSheetModalProvider>
        <View className={`flex-1 ${!switchOfMargins && 'ml-4 mr-4'}`}>
          {activityDot && (
            <View className="w-full h-2  items-end">
              {activityDot && (
                <View className="h-2 w-2 rounded-full bg-activity-dot" />
              )}
            </View>
          )}
          {name && (
            <View className="w-full">
              <Text className="text-2xl uppercase font-bold text-dark dark:text-green">
                {name}
              </Text>
            </View>
          )}
          {children}
        </View>
        {bottomSheetsProps && <MainBottomSheet {...bottomSheetsProps} />}
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}

export function ScreenBaseWithoutSaveArea({
  name,
  children,
  activityDot,
  bottomSheetsProps,
  isModalVisible,
}: Props & { isModalVisible?: boolean }) {
  const bottomOffset = useSharedValue(0);
  const transition = LinearTransition.duration(100).easing(Easing.linear);
  const mbAnimation = useAnimatedStyle(() => ({
    transform: [{ translateY: bottomOffset.value }],
  }));
  useEffect(() => {
    if (isModalVisible) {
      bottomOffset.value = withTiming(-100, {
        duration: 100,
      });
    } else {
      bottomOffset.value = withTiming(0, {
        duration: 100,
      });
    }
  }, [isModalVisible]);
  return (
    <YStack
      className="flex-1 bg-[#fff] dark:bg-dark"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <BottomSheetModalProvider>
        <Animated.View
          layout={transition}
          style={[{ flex: 1, top: 0, left: 0 }, mbAnimation]}
        >
          <View className="flex-1">
            {activityDot && (
              <View className="w-full h-2  items-end">
                {activityDot && (
                  <View className="h-2 w-2 rounded-full bg-activity-dot" />
                )}
              </View>
            )}
            {name && (
              <View className="w-full">
                <Text className="text-2xl uppercase font-bold text-dark dark:text-green">
                  {name}
                </Text>
              </View>
            )}
            {children}
          </View>
        </Animated.View>
        {bottomSheetsProps && <MainBottomSheet {...bottomSheetsProps} />}
      </BottomSheetModalProvider>
    </YStack>
  );
}
