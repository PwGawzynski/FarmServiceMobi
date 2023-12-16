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
};
