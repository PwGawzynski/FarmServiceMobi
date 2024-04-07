import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenOptionsBase } from '../../../../settings/navigators/NativeStackScreenOptionsBase';
import { OrdersDesktopDriver } from './OrdersDesktopDriver';
import { OrdersDriverParamList } from '../../../../types/self/navigation/Owner/paramLists/orders/OrdersDriverParamList';
import { OrderDetails } from '../../../pages/owner/mobi/OrderDriver/OrderDetails';
import { EditOrder } from '../../../pages/owner/mobi/OrderDriver/EditOrder';

const Stack = createNativeStackNavigator<OrdersDriverParamList>();

export function OrdersDriver() {
  return (
    <Stack.Navigator
      screenOptions={NativeStackScreenOptionsBase}
      initialRouteName="ordersDesktopRoot"
    >
      <Stack.Screen name="ordersDesktopRoot" component={OrdersDesktopDriver} />
      <Stack.Screen
        options={{
          animation: 'default',
          gestureDirection: 'horizontal',
        }}
        name="orderDetails"
        component={OrderDetails}
      />
      <Stack.Screen
        options={{
          animation: 'fade',
          gestureDirection: 'horizontal',
        }}
        name="editOrder"
        component={EditOrder}
      />
    </Stack.Navigator>
  );
}
