import { Text, View } from 'react-native';
import { ButtonTamagui } from './ButtonTamagui';

export type ActivityListCardHeadProps = {
  title: string;
  subtitle?: string;
};

export function ListCardSign({ subtitle, title }: ActivityListCardHeadProps) {
  return (
    <View className="flex-1 flex-row">
      <View className="flex-col flex-1 justify-between items-start pl-4 pt-1">
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          className="font-bold text-dark dark:text-green text-base uppercase "
        >
          {title}
        </Text>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          className="text-sm text-dark dark:text-green top-[-15%] pl-1"
        >
          {subtitle}
        </Text>
      </View>
      <View className="w-1/4 m-2">
        <ButtonTamagui text="more" />
      </View>
    </View>
  );
}
