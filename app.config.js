import { address } from 'ip';

 const name = 'FarmService';
 const version = '1.0.0';
 const extra = {
  apiUrl: address(),
  userInterfaceStyle: 'automatic',
  ios: {
    bundleIdentifier: 'com.pwgawzynski.farmservice',
  },
     plugins: [
         "expo-localization",
         "expo-secure-store",
         'react-native-reanimated/plugin',
         "@react-native-google-signin/google-signin",
         {
             "iosUrlScheme": "com.googleusercontent.apps._some_id_here_"
         }
     ],
  eas: {
    projectId: 'd93bb622-30d0-4f55-85c6-5fde5f331ce4',
      updates: {
          url: "https://u.expo.dev/d93bb622-30d0-4f55-85c6-5fde5f331ce4"
      },
      runtimeVersion: "1.0.0"
  },
};

 module.exports = ({config}) => ({
   ...config,
   name,
   version,
   extra: extra,
 });
