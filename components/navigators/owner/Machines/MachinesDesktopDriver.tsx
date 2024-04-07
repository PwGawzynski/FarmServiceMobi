import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import {
  MaterialBaseInitialLayout,
  MaterialTopTabScreenOptions,
} from '../../../../settings/navigators/MaterialTopTabScreenOptions';
import { selectTheme } from '../../../../src/redux/feature/userSlice';
import { Theme } from '../../../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../../../settings/styles/colors';
import { MachinesDesktopDriverParamList } from '../../../../types/self/navigation/Owner/paramLists/machines/MachinesDesktopDriverParamList';
import { MachinesDriverScreenProps } from '../../../../types/self/navigation/Owner/props/machines/MachinesDriverProps';
import { MachineDesktop } from '../../../pages/owner/mobi/MachineDesktopDriver/MachineDesktop';

const TopTab = createMaterialTopTabNavigator<MachinesDesktopDriverParamList>();

export function MachinesDesktopDriver({
  navigation,
}: MachinesDriverScreenProps<
  'machinesDesktopRoot',
  'machinesDriver',
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
        initialRouteName="machinesDesktop"
      >
        <TopTab.Screen name="machinesDesktop" component={MachineDesktop} />
      </TopTab.Navigator>
    </GestureDetector>
  );
}
