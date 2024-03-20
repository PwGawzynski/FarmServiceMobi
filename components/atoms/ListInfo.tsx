import { Dimensions, View } from 'react-native';
import { SizableText, useTheme } from 'tamagui';
import React from 'react';

export type ListEmptyProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Ico: any;
  height?: number;
  text?: string;
  children?: React.ReactElement | React.ReactElement[] | boolean;
  color?: string;
};

export function ListInfo({
  Ico,
  height,
  text,
  children,
  color: _color,
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
        color={_color ?? color?.val}
      />
      <SizableText
        color={_color ?? color?.val}
        className="mt-8  text-center"
        fontSize="$5"
      >
        {text ?? 'Unknown Error Occurred!'}
      </SizableText>
      {children}
    </View>
  );
}
