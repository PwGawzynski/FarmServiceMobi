import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import { OrdersDesktop } from '../../../pages/mobi/OrdersDesktopDriver/OrdersDesktop';
import { OrdersDesktopDriverParamList } from '../../../../types/self/navigation/paramLists/orders/OrdersDesktopDriverParamList';
import {
  MaterialBaseInitialLayout,
  MaterialTopTabScreenOptions,
} from '../../../../settings/navigators/MaterialTopTabScreenOptions';
import { selectTheme } from '../../../../src/redux/feature/userSlice';
import { Theme } from '../../../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../../../settings/styles/colors';

const TopTab = createMaterialTopTabNavigator<OrdersDesktopDriverParamList>();

export function OrdersDesktopDriver() {
  const theme = useSelector(selectTheme);

  return (
    <TopTab.Navigator
      style={{
        backgroundColor: theme === Theme.dark ? Colors.DARK : Colors.WHITE,
        paddingBottom: '5%',
      }}
      initialLayout={MaterialBaseInitialLayout}
      screenOptions={MaterialTopTabScreenOptions}
      initialRouteName="ordersDesktop"
    >
      <TopTab.Screen name="ordersDesktop" component={OrdersDesktop} />
    </TopTab.Navigator>
  );
}
