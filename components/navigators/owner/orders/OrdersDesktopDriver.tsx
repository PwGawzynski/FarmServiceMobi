import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { OrdersDesktop } from '../../../pages/mobi/OrdersDesktopDriver/OrdersDesktop';
import { OrdersDesktopDriverParamList } from '../../../../types/self/navigation/paramLists/orders/OrdersDesktopDriverParamList';
import { MaterialTopTabScreenOptions } from '../../../../settings/navigators/MaterialTopTabScreenOptions';

const TopTab = createMaterialTopTabNavigator<OrdersDesktopDriverParamList>();

export function OrdersDesktopDriver() {
  return (
    <TopTab.Navigator
      screenOptions={MaterialTopTabScreenOptions}
      initialRouteName="ordersDesktop"
    >
      <TopTab.Screen name="ordersDesktop" component={OrdersDesktop} />
    </TopTab.Navigator>
  );
}
