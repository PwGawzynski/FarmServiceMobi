import { View } from 'react-native';
import { ButtonTamagui } from '../atoms/ButtonTamagui';

export type ButtonOptions = {
  title: string;
  onPress: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: any;
};

export type Props = {
  options: ButtonOptions[];
  boxStyles?: string;
};

/**
 * @description - Bottom panel with buttons, generates buttons based on given options array
 * @param options - array of button options ButtonOptions[]
 * @param buttonStyles - styles for buttons
 * @param boxStyles - styles for box
 * @constructor
 */
export function NavigationBottomPanel({ options, boxStyles }: Props) {
  return (
    <View
      className={`flex-row gap-2 justify-center items-center flex-wrap mt-2  ${boxStyles}`}
    >
      {options.map((option, i) => (
        <ButtonTamagui
          icon={option.Icon}
          buttonProps={{
            onPress: option.onPress,
            f: 1,
            minWidth: '40%',
            height: '$4',
            mb: '$2',
            mr: i % 2 === 0 ? '$2' : '0',
          }}
          text={option.title}
          key={Math.random()}
        />
      ))}
    </View>
  );
}
