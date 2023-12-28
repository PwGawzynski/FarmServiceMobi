import React, { useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useColorScheme } from 'nativewind';
import { isNull } from '@notifee/react-native/dist/utils';
import { UseStoredTheme } from '../../../../hooks/UseStoredTheme';

export type Props = {
  name?: string;
  children?: React.ReactNode;
};

export function ScreenBase({ name, children }: Props) {
  const { theme } = UseStoredTheme();
  const { colorScheme, setColorScheme } = useColorScheme();
  useEffect(() => {
    console.log(theme, 'APP_THEME');
    if (!isNull(theme)) {
      setColorScheme(theme === 0 ? 'light' : 'dark');
    }
  }, [theme]);
  return (
    <SafeAreaView
      className={`flex-1 ${colorScheme === 'dark' ? 'bg-dark' : 'bg-white'}`}
    >
      <View className="flex-1 ml-4 mr-4">
        <View className="w-full">
          <Text className="text-2xl uppercase font-bold text-dark dark:text-green">
            {name}
          </Text>
        </View>
        {children}
      </View>
    </SafeAreaView>
  );
}
