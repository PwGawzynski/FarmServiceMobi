import { address } from 'ip';

// eslint-disable-next-line no-console
console.log(
  `Server is running using IP address  ${address()} as backend default`,
);

export const name = 'FarmService';
export const version = '1.0.0';
export const extra = {
  apiUrl: address(),
  userInterfaceStyle: 'automatic',
  ios: {
    bundleIdentifier: 'com.pwgawzynski.farmservice',
  },
  eas: {
    projectId: 'b48a6345-3ec7-4a22-810a-1f6908314c3a',
  },
};
