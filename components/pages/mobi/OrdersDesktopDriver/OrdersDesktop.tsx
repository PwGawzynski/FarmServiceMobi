import { View } from 'react-native';
import { ScreenBase } from '../common/ScreenBase';
import { ListCard } from '../../../atoms/ListCard';
import { VerticalList } from '../../../molecules/VerticalList';
import { ListCardSign } from '../../../atoms/ListCardSign';

const data = [
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
];

export function OrdersDesktop() {
  return (
    <ScreenBase name="orders">
      <View className="h-4 w-full" />
      <VerticalList
        estimatedSize={150}
        renderItem={item => (
          <ListCard
            headerElement={
              <ListCardSign
                title={item.item.title}
                subtitle={item.item.subtitle}
              />
            }
            middleElement={<View className="flex-1 p-2" />}
            fixedHeight={150}
          />
        )}
        data={data}
      />
    </ScreenBase>
  );
}
