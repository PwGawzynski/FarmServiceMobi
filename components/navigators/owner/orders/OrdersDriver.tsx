import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenOptionsBase } from '../../../../settings/navigators/NativeStackScreenOptionsBase';
import { OrdersDesktopDriver } from './OrdersDesktopDriver';
import { OrdersDriverParamList } from '../../../../types/self/navigation/Owner/paramLists/orders/OrdersDriverParamList';
import { EditOrder } from '../../../pages/owner/mobi/OrderDriver/EditOrder';
import { CreateTask } from '../../../pages/owner/mobi/OrderDriver/CreateTask';
import { OrderAccounting } from '../../../pages/owner/mobi/OrderDriver/OrderAccounting';
import { OrderAccountingSelectPrices } from '../../../pages/owner/mobi/OrderDriver/OrderAccountingSelectPrices';
import { AccountingSummary } from '../../../pages/owner/mobi/OrderDriver/AccountingSummary';
import { OrderTasksScreen } from '../../../pages/owner/mobi/OrderDriver/OrderTasksScreen';
import { OrderControlPanel } from '../../../pages/owner/mobi/OrderDriver/OrderControlPanel';
import { OrderInfo } from '../../../pages/owner/mobi/OrderDriver/OrderInfo';

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
          animation: 'fade',
          gestureDirection: 'horizontal',
        }}
        name="orderTasksScreen"
        component={OrderTasksScreen}
      />
      <Stack.Screen
        options={{
          animation: 'fade',
          gestureDirection: 'horizontal',
        }}
        name="orderInfo"
        component={OrderInfo}
      />
      <Stack.Screen
        options={{
          animation: 'default',
          gestureDirection: 'horizontal',
        }}
        name="orderControlPanel"
        component={OrderControlPanel}
      />
      <Stack.Screen
        options={{
          animation: 'fade',
          gestureDirection: 'horizontal',
        }}
        name="editOrder"
        component={EditOrder}
      />
      <Stack.Screen
        options={{
          animation: 'default',
          gestureDirection: 'horizontal',
        }}
        name="createTask"
        component={CreateTask}
      />
      <Stack.Screen
        options={{
          animation: 'fade',
          gestureDirection: 'horizontal',
        }}
        name="orderAccounting"
        component={OrderAccounting}
      />
      <Stack.Screen
        options={{
          animation: 'fade',
          gestureDirection: 'horizontal',
        }}
        name="orderAccountingSelectPrices"
        component={OrderAccountingSelectPrices}
      />
      <Stack.Screen
        options={{
          animation: 'fade',
          gestureDirection: 'horizontal',
        }}
        name="orderAccountingInvoice"
        component={AccountingSummary}
      />
    </Stack.Navigator>
  );
}
