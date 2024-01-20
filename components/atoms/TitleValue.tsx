import { Text, View } from 'react-native';

export type TitleValueProps = {
  titles: string[];
  keys: string[];
};

export function TitleValue({ titles, keys }: TitleValueProps) {
  return (
    <View testID="title-value-info" className="flex-1 justify-between flex-col">
      {titles.map((key, index) => (
        <View
          testID="title-value-pair"
          className="flex flex-row "
          key={Math.random()}
        >
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            className="flex-1 uppercase font-bold text-left text-dark dark:text-green"
          >
            {key}
          </Text>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            className="flex-1 uppercase text-right text-dark dark:text-green"
          >
            {keys[index]}
          </Text>
        </View>
      ))}
    </View>
  );
}
