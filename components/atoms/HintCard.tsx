import { Card, SizableText, XStack, YStack } from 'tamagui';
import { useSelector } from 'react-redux';
import InfoIcon from '../../assets/info.svg';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../settings/styles/colors';
import { selectTheme } from '../../src/redux/feature/userSlice';
import DotIcon from '../../assets/dot.svg';
import CheckIcon from '../../assets/check.svg';
import DangerIco from '../../assets/danger.svg';

export interface GuideCardProps {
  header: string;
  text: string;
  children?: React.ReactNode;
  type?: 'hint' | 'error';
}

export function HintCard({
  header,
  text,
  children,
  type = 'hint',
}: GuideCardProps) {
  const theme = useSelector(selectTheme);
  const isHint = type === 'hint';
  return (
    <Card bordered borderColor={isHint ? '$color11' : Colors.ERROR_RED} p="$3">
      <XStack>
        <YStack f={1}>
          <SizableText
            fontSize="$4"
            className={`uppercase font-bold mb-3 text-light-blue dark:text-dark-gray ${
              !isHint ? 'text-error-red' : ''
            }`}
          >
            {header}
          </SizableText>
          <SizableText className="text-light-blue dark:text-dark-gray">
            {text}
          </SizableText>
          <YStack className="mt-4">{children}</YStack>
        </YStack>
        <YStack ai="flex-end">
          {isHint && (
            <InfoIcon
              color={
                theme === Theme.dark ? Colors.DARK_GRAY : Colors.LIGHT_BLUE
              }
            />
          )}
          {!isHint && <DangerIco color={Colors.ERROR_RED} />}
        </YStack>
      </XStack>
    </Card>
  );
}

export interface GuideCardElementProps {
  text: string;
  isDone?: boolean;
  isCurrent?: boolean;
}

export function GuideCardElement({
  text,
  isDone,
  isCurrent,
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
        fontSize={isCurrent ? '$4' : '$2'}
        style={{
          textDecorationLine: isDone ? 'line-through' : 'none',
          fontWeight: isCurrent ? 'bold' : 'normal',
        }}
      >
        {text}
      </SizableText>
    </XStack>
  );
}
