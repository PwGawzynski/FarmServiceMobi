import { Dimensions, View } from 'react-native';
import { SizableText, useTheme } from 'tamagui';
import React from 'react';

export type ListEmptyProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  EmptyIco: any;
  height?: number;
  text?: string;
  children?: React.ReactElement;
};

export function EmptyList({
  EmptyIco: Ico,
  height,
  text,
  children,
}: ListEmptyProps) {
  const EMPTY_HEIGHT = height ?? Dimensions.get('window').height * 0.7;
  const { color } = useTheme();
  return (
    <View
      style={{
        height: EMPTY_HEIGHT,
      }}
      className="flex-1 items-center justify-center"
    >
      <Ico
        width={EMPTY_HEIGHT / 10}
        height={EMPTY_HEIGHT / 10}
        color={color?.val}
      />
      <SizableText className="mt-8" fontSize="$5">
        {text ?? 'There is nothing to see here :('}
      </SizableText>
      {children}
    </View>
  );
}
