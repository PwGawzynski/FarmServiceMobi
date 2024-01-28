import { View } from 'react-native';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { ListCard } from '../atoms/ListCard';
import { ListCardSign } from '../atoms/ListCardSign';
import { VerticalList } from '../molecules/VerticalList';

// TODO: remove this, change to type from backend
type OrderI = {
  title: string;
  subtitle: string;
};

const data = [
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
  { title: 'koszenie', subtitle: 'Jan kowalski' },
];

export function OrdersList() {
  const renderItem = (item: ListRenderItemInfo<OrderI>) => (
    <ListCard
      headerElement={
        <ListCardSign title={item.item.title} subtitle={item.item.subtitle} />
      }
      middleElement={<View className="flex-1 p-2" />}
      fixedHeight={150}
    />
  );
  return (
    <VerticalList estimatedSize={150} renderItem={renderItem} data={data} />
  );
}
