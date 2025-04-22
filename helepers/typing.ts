// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsAny<T extends { [key: string]: any }> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in keyof T]: any;
};
export type EnumType = { [key: string]: string | number };
