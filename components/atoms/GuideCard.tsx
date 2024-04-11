import { Card, SizableText, XStack, YStack } from 'tamagui';
import { useSelector } from 'react-redux';
import InfoIcon from '../../assets/info.svg';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../settings/styles/colors';
import { selectTheme } from '../../src/redux/feature/userSlice';

export interface GuideCardProps {
  header: string;
  text: string;
}

export function GuideCard({ header, text }: GuideCardProps) {
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
