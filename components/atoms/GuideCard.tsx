import { Card, SizableText, XStack, YStack } from 'tamagui';
import { useSelector } from 'react-redux';
import InfoIcon from '../../assets/info.svg';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../settings/styles/colors';
import { selectTheme } from '../../src/redux/feature/userSlice';
import DotIcon from '../../assets/dot.svg';
import CheckIcon from '../../assets/check.svg';

export interface GuideCardProps {
  header: string;
  text: string;
  children?: React.ReactNode;
}

export function GuideCard({ header, text, children }: GuideCardProps) {
  const theme = useSelector(selectTheme);
  return (
    <Card bordered borderColor="$color11" p="$3">
      <XStack>
        <YStack f={1}>
          <SizableText
            fontSize="$4"
            className="uppercase font-bold mb-3 text-light-blue dark:text-dark-gray"
          >
            {header}
          </SizableText>
          <SizableText className="text-light-blue dark:text-dark-gray">
            {text}
          </SizableText>
          <YStack className="mt-4">{children}</YStack>
        </YStack>
        <YStack ai="flex-end">
          <InfoIcon
            color={theme === Theme.dark ? Colors.DARK_GRAY : Colors.LIGHT_BLUE}
          />
        </YStack>
      </XStack>
    </Card>
  );
}

export interface GuideCardElementProps {
  text: string;
  isDone?: boolean;
  isCurent?: boolean;
}

export function GuideCardElement({
  text,
  isDone,
  isCurent,
}: GuideCardElementProps) {
  const theme = useSelector(selectTheme);
  const iconColor = theme === Theme.dark ? Colors.WHITE : Colors.LIGHT_BLUE;
  const textColor = theme === Theme.dark ? Colors.WHITE : Colors.LIGHT_BLUE;
  return (
    <XStack ai="center">
      <XStack>
        {isDone ? (
          <CheckIcon color={iconColor} />
        ) : (
          <DotIcon color={iconColor} />
        )}
      </XStack>
      <SizableText
        ml="$2"
        color={textColor}
        textTransform="uppercase"
        fontSize={isCurent ? '$4' : '$2'}
        style={{
          textDecorationLine: isDone ? 'line-through' : 'none',
          fontWeight: isCurent ? 'bold' : 'normal',
        }}
      >
        {text}
      </SizableText>
    </XStack>
  );
}
