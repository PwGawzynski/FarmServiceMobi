import { Dimensions, View } from 'react-native';
import { SizableText, useTheme, YStack } from 'tamagui';
import React, { useEffect, useState } from 'react';
import { t } from 'i18next';
import { TranslationNames } from '../../locales/TranslationNames';
import Empty from '../../assets/empty.svg';

export type ListEmptyProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Ico?: any;
  height?: number;
  text?: string;
  children?: React.ReactElement | React.ReactElement[] | boolean;
  color?: string;
  beFlex?: boolean;
  isDelayed?: boolean;
};

const TRANSLATIONS = {
  unknownError: t(TranslationNames.components.listInfo.unknownError),
};
const LIST_EMPTY_DELAY = 50;

export function ListInfo({
  Ico,
  height,
  text,
  children,
  color: _color,
  beFlex,
  isDelayed,
}: ListEmptyProps) {
  const EMPTY_HEIGHT = height ?? Dimensions.get('window').height * 0.7;
  const { color } = useTheme();
  const [canShow, setCanShow] = useState(false);
  useEffect(() => {
    if (isDelayed) {
      const timer = setTimeout(() => {
        setCanShow(true);
      }, LIST_EMPTY_DELAY);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isDelayed]);
  if (!canShow) return null;
  return (
    <View
      style={{
        height: beFlex ? undefined : EMPTY_HEIGHT,
        flex: beFlex ? 1 : undefined,
      }}
      className="flex-1 items-center justify-center"
    >
      <YStack ai="center" jc="center" f={1}>
        {Ico ? (
          <Ico
            width={EMPTY_HEIGHT / 10}
            height={EMPTY_HEIGHT / 10}
            color={_color ?? color?.val}
          />
        ) : (
          <Empty
            width={EMPTY_HEIGHT / 10}
            height={EMPTY_HEIGHT / 10}
            color={_color ?? color?.val}
          />
        )}
        <SizableText
          color={_color ?? color?.val}
          className="mt-8  text-center"
          fontSize="$5"
        >
          {text ?? TRANSLATIONS.unknownError}
        </SizableText>
        {children}
      </YStack>
    </View>
  );
}
