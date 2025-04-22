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
import { WorkersDesktopDriverParamList } from '../../../../types/self/navigation/Owner/paramLists/workers/WorkersDesktopDriverParamList';
import { WorkersDriverScreenProps } from '../../../../types/self/navigation/Owner/props/workers/WorkersDriverProps';
import { WorkersDesktop } from '../../../pages/owner/mobi/WorkersDesktopDriver/WorkersDesktop';
import { AddWorker } from '../../../pages/owner/mobi/WorkersDesktopDriver/AddWorker';

const TopTab = createMaterialTopTabNavigator<WorkersDesktopDriverParamList>();

export function WorkersDesktopDriver({
  navigation,
}: WorkersDriverScreenProps<
  'workersDesktopRoot',
  'workersDriver',
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
        initialRouteName="workersDesktop"
      >
        <TopTab.Screen name="addWorker" component={AddWorker} />
        <TopTab.Screen name="workersDesktop" component={WorkersDesktop} />
      </TopTab.Navigator>
    </GestureDetector>
  );
}
