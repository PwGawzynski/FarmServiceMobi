import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OwnerRootDriverParamList } from '../../../types/self/navigation/paramLists/OwnerRootDriverParamList';
import { NativeStackScreenOptionsBase } from '../../../settings/navigators/NativeStackScreenOptionsBase';
import { ActivityDriver } from './activities/ActivitiesDriver';
import { OrdersDriver } from './orders/OrdersDriver';
import { ClientsDriver } from './clients/ClientsDirver';

const Stack = createNativeStackNavigator<OwnerRootDriverParamList>();

export function OwnerRootDriver() {
  return (
    <Stack.Navigator
      // REMEMEBER TO change navigation in Landing when changing initialRouteName
      initialRouteName="activityDriver"
      screenOptions={NativeStackScreenOptionsBase}
    >
      <Stack.Screen name="clientsDriver" component={ClientsDriver} />
      <Stack.Screen name="ordersDriver" component={OrdersDriver} />
      <Stack.Screen name="activityDriver" component={ActivityDriver} />
    </Stack.Navigator>
  );
}
