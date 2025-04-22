import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import { Dimensions } from 'react-native';

export const MaterialTopTabScreenOptions = {
  tabBarStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
  tabBarActiveTintColor: '#000',
  tabBarInactiveTintColor: '#000',
  tabBarIndicatorStyle: {
    backgroundColor: 'transparent',
  },
  tabBarShowLabel: false,
  headerShown: false,
} as MaterialTopTabNavigationOptions;

export const MaterialBaseInitialLayout = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
