import React from 'react';
import { Platform, SafeAreaView, StatusBar, Text, View } from 'react-native';

export type Props = {
  name?: string;
  children?: React.ReactNode;
  activityDot?: boolean;
};

export function ScreenBase({ name, children, activityDot }: Props) {
  return (
    <SafeAreaView
      className="flex-1 bg-[#fff] dark:bg-dark"
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
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
    </SafeAreaView>
  );
}
