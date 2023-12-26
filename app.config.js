import { address } from 'ip';

 const name = 'FarmService';
 const version = '1.0.0';
 const extra = {
  apiUrl: address(),
  userInterfaceStyle: 'automatic',
  ios: {
    bundleIdentifier: 'com.pwgawzynski.farmservice',
  },
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
