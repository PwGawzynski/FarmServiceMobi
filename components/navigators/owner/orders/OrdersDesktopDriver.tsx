import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { OrderDesktop } from '../../../pages/mobi/OrdersDesktopDriver/OrderDesktop';
import { OrdersDesktopDriverParamList } from '../../../../types/self/navigation/paramLists/orders/OrdersDesktopDriverParamList';
import {
  MaterialBaseInitialLayout,
  MaterialTopTabScreenOptions,
} from '../../../../settings/navigators/MaterialTopTabScreenOptions';
import { selectTheme } from '../../../../src/redux/feature/userSlice';
import { Theme } from '../../../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../../../settings/styles/colors';
import { OrdersDriverScreenProps } from '../../../../types/self/navigation/props/orders/OrdersDriverProps';

const TopTab = createMaterialTopTabNavigator<OrdersDesktopDriverParamList>();

export function OrdersDesktopDriver({
  navigation,
}: OrdersDriverScreenProps<
  'ordersDesktopRoot',
  'ordersDriver',
  'ownerRootDriver'
>) {
  const theme = useSelector(selectTheme);
  const fling = Gesture.Fling();
  fling
    .direction(Directions.DOWN)
    .enabled(Platform.OS === 'android')
    .onEnd(() => {
      navigation.goBack();
    });
  return (
    <GestureDetector gesture={fling}>
      <TopTab.Navigator
        style={{
          backgroundColor: theme === Theme.dark ? Colors.DARK : Colors.WHITE,
          paddingBottom: '5%',
        }}
        initialLayout={MaterialBaseInitialLayout}
        screenOptions={MaterialTopTabScreenOptions}
        initialRouteName="ordersDesktop"
      >
        <TopTab.Screen name="ordersDesktop" component={OrderDesktop} />
      </TopTab.Navigator>
    </GestureDetector>
  );
}
