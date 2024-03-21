import React from 'react';
import { Platform, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {
  MainBottomSheet,
  MainBottomSheetProps,
} from '../../../../organisms/BottomSheet';

export type Props = {
  name?: string;
  children?: React.ReactNode;
  activityDot?: boolean;
  bottomSheetsProps?: MainBottomSheetProps;
};

export function ScreenBase({
  name,
  children,
  activityDot,
  bottomSheetsProps,
}: Props) {
  return (
    <SafeAreaView
      className="flex-1 bg-[#fff] dark:bg-dark"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <BottomSheetModalProvider>
        <View className="flex-1 ml-4 mr-4 ">
          <View className="w-full h-2  items-end">
            {activityDot && (
              <View className="h-2 w-2 rounded-full bg-activity-dot" />
            )}
          </View>
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
