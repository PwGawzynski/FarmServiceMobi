export type AuthDriverParamList = {
  landing: undefined;
  chooseLoginType: undefined;
  loginByEmail: undefined;
  chooseRegisterType: undefined;
  passwordReset: undefined;
  OperationConfirmed: {
    redirectScreenName: keyof AuthDriverParamList;
    shownMessage?: string;
    goBack?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
  };
};
