import { UseControllerProps } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormRulesType<T extends Record<string, any>> = Partial<
  Record<keyof T, UseControllerProps<T>['rules']>
>;
