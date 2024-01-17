import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OrdersDriverParamList } from '../../../../types/self/navigation/paramLists/orders/OrdersDriverParamList';
import { NativeStackScreenOptionsBase } from '../../../../settings/navigators/NativeStackScreenOptionsBase';
import { OrdersDesktopDriver } from './OrdersDesktopDriver';

const Stack = createNativeStackNavigator<OrdersDriverParamList>();

export function OrdersDriver() {
  return (
    <Stack.Navigator
      screenOptions={NativeStackScreenOptionsBase}
      initialRouteName="ordersDesktopRoot"
    >
      <Stack.Screen name="ordersDesktopRoot" component={OrdersDesktopDriver} />
    </Stack.Navigator>
  );
}
