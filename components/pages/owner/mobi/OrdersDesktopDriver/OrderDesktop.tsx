import { View } from 'react-native';
import { ScreenBase } from '../common/ScreenBase';
import { OrdersList } from '../../../../organisms/OrdersList';

export function OrderDesktop() {
  // const company = useSelector(selectUserCompany);
  return (
    <ScreenBase name="orders">
      <View className="h-4 w-full" />
      <OrdersList />
    </ScreenBase>
  );
}
