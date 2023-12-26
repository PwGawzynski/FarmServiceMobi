import { createSlice } from '@reduxjs/toolkit';
import { Theme } from '../../../FarmServiceApiTypes/Account/Constants';
import { UserResponseBase } from '../../../FarmServiceApiTypes/User/Responses';
import { UserRole } from '../../../FarmServiceApiTypes/User/Enums';

type UserContextI = {
  role: UserRole | undefined;
  personal_data: Partial<UserResponseBase['personalData']>;
  address: Partial<UserResponseBase['address']>;
  account: Partial<UserResponseBase['account']>;
};

export type UserSliceI = {
  user: UserContextI;
};

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    role: undefined,
    personal_data: {
      name: undefined,
      surname: undefined,
      phoneNumber: undefined,
      phone_number: undefined,
    },
    address: {
      city: undefined,
      county: undefined,
      voivodeship: undefined,
      postalCode: undefined,
      street: undefined,
      houseNumber: undefined,
      apartmentNumber: undefined,
    },
    account: {
      email: undefined,
      password: undefined,
      isActivated: undefined,
      theme: Theme.dark,
      activationCode: undefined,
    },
  } as UserContextI,
  reducers: {
    setTheme: (state, value) => {
      // eslint-disable-next-line no-param-reassign
      state.account.theme = value.payload;
    },
    setUser: (state, value) => {
      // eslint-disable-next-line no-param-reassign
      state.role = value.payload.role;
      // eslint-disable-next-line no-param-reassign
      state.account = value.payload.account;
      // eslint-disable-next-line no-param-reassign
      state.address = value.payload.address;
    },
  },
});

export const { setTheme, setUser } = UserSlice.actions;

export const selectTheme = (state: UserSliceI) => state.user.account.theme;
export const selectUserRole = (state: UserSliceI) => state.user.role;
export const selectUserPersonalData = (state: UserSliceI) =>
  state.user.personal_data;
export const selectUserAddress = (state: UserSliceI) => state.user.address;
export const selectUserAccount = (state: UserSliceI) => state.user.account;

export default UserSlice.reducer;
