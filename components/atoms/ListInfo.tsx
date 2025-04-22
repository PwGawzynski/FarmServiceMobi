import { Dimensions, View } from 'react-native';
import { useEffect, useState } from 'react';
import { t } from 'i18next';
import { TranslationNames } from '../../locales/TranslationNames';
import { HintCard } from './HintCard';

export type ListEmptyProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  height?: number;
  text?: string;
  beFlex?: boolean;
  isDelayed?: boolean;
};

const TRANSLATIONS = {
  unknownError: t(TranslationNames.components.listInfo.unknownError),
  emptyListHeader: t(TranslationNames.components.listInfo.emptyListHeader),
};
const LIST_EMPTY_DELAY = 50;

export function ListInfo({ height, text, beFlex, isDelayed }: ListEmptyProps) {
  const EMPTY_HEIGHT = height ?? Dimensions.get('window').height * 0.7;
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
      className="flex-1"
    >
      <HintCard
        header={TRANSLATIONS.emptyListHeader}
        text={text ?? TRANSLATIONS.unknownError}
      />
    </View>
  );
}
