import { H2, Stack, XStack } from 'tamagui';
import React from 'react';
import { FlexAlignType, SafeAreaView } from 'react-native';
import { ScreenCard } from '../../../atoms/ScreenCard';

export type Props = {
  name: string;
  children?: React.ReactNode;
  filed?: boolean;
  align?: FlexAlignType;
};

export function ScreenBase({ name, children, filed, align }: Props) {
  return (
    <ScreenCard filed={filed}>
      <SafeAreaView style={{ flex: 1, width: '100%' }}>
        <Stack w="100%" alignItems={align ?? 'center'} f={1}>
          <XStack width="100%">
            <H2 textAlign="left" textTransform="uppercase">
              {name}
            </H2>
          </XStack>
          {children}
        </Stack>
      </SafeAreaView>
    </ScreenCard>
  );
}
