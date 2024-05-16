import { SizableText } from 'tamagui';
import { TouchableOpacity } from 'react-native';

export interface SettingsI {
  title: string;
  name: 'logout' | 'changeTheme' | 'changeLanguage';
  Icon: React.ReactNode;
}

export interface SettingOptionProps {
  title: string;
  Icon: React.ReactNode;
  onPress: (key: string) => void;
  name: SettingsI['name'];
  topBorder?: boolean;
}

export function SettingOption({
  title,
  Icon,
  onPress,
  topBorder,
  name,
}: SettingOptionProps) {
  const handlePress = () => onPress(name);
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`max-h-12 flex-1 flex-row items-center border-b-2 ${topBorder ? 'border-t-2' : ''}  border-dark-gray border-solid pl-2`}
    >
      {Icon}
      <SizableText fontSize="$4" className="pl-4">
        {title}
      </SizableText>
    </TouchableOpacity>
  );
}
