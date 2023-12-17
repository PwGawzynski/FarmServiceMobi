import { H3, Stack } from 'tamagui';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { ScreenCard } from '../../../atoms/ScreenCard';

export type Props = {
  name: string;
  children?: React.ReactNode;
  filed?: boolean;
};

export function ScreenBase({ name, children, filed }: Props) {
  return (
    <ScreenCard filed={filed}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack f={1}>
          <H3 textTransform="uppercase">{name}</H3>
          {children}
        </Stack>
      </SafeAreaView>
    </ScreenCard>
  );
}
