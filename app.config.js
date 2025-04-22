import { address } from 'ip';

 const name = 'FarmService';
 const version = '1.0.0';
 const extra = {
  apiUrl: address(),
  userInterfaceStyle: 'automatic',
  ios: {
    bundleIdentifier: 'com.pwgawzynski.farmservice',
      supportsTablet: true,
      bitcode: false,
      config: {
          usesNonExemptEncryption: false
      },
      googleSignIn: {
          reservedClientId: "com.googleusercontent.apps.1000011250982-i8mm7lll3aie0vv2jbvigbmp0gv94b8c"
      },
      infoPlist: {
          CFBundleURLTypes: [
              {
                  CFBundleURLSchemes: ["com.googleusercontent.apps.1000011250982-i8mm7lll3aie0vv2jbvigbmp0gv94b8c"]
              }
          ]
      }
  },
     plugins: [
         "expo-localization",
         "expo-secure-store",
         'react-native-reanimated/plugin',
         "@react-native-google-signin/google-signin"
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
