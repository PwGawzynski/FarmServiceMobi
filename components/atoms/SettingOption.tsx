import { SizableText, XStack } from 'tamagui';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import FailIco from '../../assets/fail.svg';
import { Colors } from '../../settings/styles/colors';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';

export interface SettingsI {
  title: string;
  name: 'logout' | 'changeTheme' | 'changeLanguage';
  Icon: React.ReactNode;
  isError?: boolean;
  isPending?: boolean;
}

export interface SettingOptionProps {
  title: string;
  Icon: React.ReactNode;
  onPress: (key: string) => void;
  name: SettingsI['name'];
  theme?: Theme;
  topBorder?: boolean;
  isError?: boolean;
  isPending?: boolean;
}

export function SettingOption({
  title,
  Icon,
  onPress,
  topBorder,
  name,
  isPending,
  isError,
  theme,
}: SettingOptionProps) {
  const handlePress = () => onPress(name);
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`max-h-12 flex-1 flex-row items-center border-b-2 ${topBorder ? 'border-t-2' : ''}  border-dark-gray border-solid pl-2`}
    >
      {Icon}
      <SizableText fontSize="$4" className="pl-4" color="$color2">
        {title}
      </SizableText>
      <XStack f={1} jc="flex-end" pr="$4">
        {isPending && (
          <ActivityIndicator
            size="small"
            color={theme === Theme.dark ? Colors.GREEN : Colors.DARK_BLUE}
          />
        )}
        {isError && <FailIco width={20} height={20} fill={Colors.ERROR_RED} />}
      </XStack>
    </TouchableOpacity>
  );
}
