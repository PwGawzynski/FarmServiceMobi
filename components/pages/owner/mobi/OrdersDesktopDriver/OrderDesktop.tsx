import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { ScreenBase } from '../common/ScreenBase';
import { OrdersList } from '../../../../organisms/OrdersList';
import { selectUserCompany } from '../../../../../src/redux/feature/userSlice';

export function OrderDesktop() {
  const company = useSelector(selectUserCompany);
  console.log(company);
  return (
    <ScreenBase name="orders">
      <View className="h-4 w-full" />
      <OrdersList />
    </ScreenBase>
  );
}
