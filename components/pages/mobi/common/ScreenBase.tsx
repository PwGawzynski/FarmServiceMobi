import React, { useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useSelector } from 'react-redux';
import { Theme } from '../../../../FarmServiceApiTypes/Account/Constants';
import { selectTheme } from '../../../../src/redux/feature/userSlice';

export type Props = {
  name?: string;
  children?: React.ReactNode;
  activityDot?: boolean;
};

export function ScreenBase({ name, children, activityDot }: Props) {
  const theme = useSelector(selectTheme);
  const { setColorScheme } = useColorScheme();
  useEffect(() => {
    setColorScheme(theme === Theme.light ? 'light' : 'dark');
  }, [theme]);
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
