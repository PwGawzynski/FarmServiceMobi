import { View } from 'react-native';
import { AppButton } from '../atoms/AppButton';

export type ButtonOptions = {
  title: string;
  onPress: () => void;
};

export type Props = {
  options: ButtonOptions[];
  boxStyles?: string;
  buttonStyles?: string;
};

export function NavigationBottomPanel({
  options,
  buttonStyles,
  boxStyles,
}: Props) {
  return (
    <View
      className={`flex-1 flex-row gap-3 justify-center items-center flex-wrap mt-2 ${boxStyles}`}
    >
      {options.map(option => (
        <AppButton
          style={{ minWidth: '40%' }}
          className={`max-h-10 ${buttonStyles}`}
          title={option.title}
          onPress={option.onPress}
          key={Math.random()}
        />
      ))}
    </View>
  );
}
