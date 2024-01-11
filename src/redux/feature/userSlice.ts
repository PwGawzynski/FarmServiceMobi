/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { UserResponseBase } from '../../../FarmServiceApiTypes/User/Responses';
import { UserRole } from '../../../FarmServiceApiTypes/User/Enums';
import { Api } from '../../../api/Api';
import {
  getThemeFromStorage,
  setThemeToStorage,
} from '../../../helepers/ThemeHelpers';

export enum InitializationStatus {
  PENDING,
  FULFILLED,
  REJECTED,
}

type UserContextI = {
  role: UserRole | undefined;
  personal_data: Partial<UserResponseBase['personal_data']>;
  address: Partial<UserResponseBase['address']>;
  account: Partial<UserResponseBase['account']>;
  initializationStatus: InitializationStatus;
  isLogged: boolean;
};

export type UserSliceI = {
  user: UserContextI;
};

const initUserData: UserContextI = {
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
    theme: undefined,
    activationCode: undefined,
  },
  initializationStatus: InitializationStatus.PENDING,
  isLogged: false,
} as UserContextI;

export const setUpUser = createAsyncThunk('user/fetchUser', async () => {
  try {
    await Api.init();
    const response = await Api.me();
    return {
      isLogged: true,
      initializationStatus: InitializationStatus.FULFILLED,
      ...response.payload,
    };
  } catch (error) {
    console.info(error, "Couldn't fetch user in userSlice");
    if (error instanceof AxiosError) {
      return {
        ...initUserData,
        initializationStatus: InitializationStatus.REJECTED,
        account: { theme: await getThemeFromStorage() },
      };
    }
    return {
      ...initUserData,
      initializationStatus: InitializationStatus.REJECTED,
      isLogged: false,
    };
  }
});

export const setUserAsync = createAsyncThunk(
  'user/setUserAsync',
  async (data: UserResponseBase & { isLogged: boolean }) => {
    console.log(data);
    await setThemeToStorage(data.account.theme);
    return { ...data };
  },
);

const UserSlice = createSlice({
  name: 'user',
  initialState: initUserData,
  extraReducers(builder) {
    builder.addCase(setUpUser.fulfilled, (state, action) => {
      state.isLogged = action.payload?.isLogged;
      state.initializationStatus = action.payload?.initializationStatus;
      state.role = action.payload?.role;
      if (action.payload?.account) state.account = action.payload.account;
      if (action.payload?.personal_data)
        state.personal_data = action.payload?.personal_data;
    });
    builder.addCase(setUserAsync.fulfilled, (state, action) => {
      state.isLogged = action.payload.isLogged;
      state.role = action.payload.role;
      state.account = action.payload.account;
      state.address = action.payload.address;
    });
  },
  reducers: {
    setTheme: (state, value) => {
      state.account.theme = value.payload;
    },
  },
});

export const { setTheme } = UserSlice.actions;

export const selectTheme = (state: UserSliceI) => state.user.account.theme;
export const selectUserRole = (state: UserSliceI) => state.user.role;
export const selectInitStatus = (state: UserSliceI) =>
  state.user.initializationStatus;
export const selectIsLogged = (state: UserSliceI) => state.user.isLogged;
export const selectUserPersonalData = (state: UserSliceI) =>
  state.user.personal_data;
export const selectUserAddress = (state: UserSliceI) => state.user.address;
export const selectUserAccount = (state: UserSliceI) => state.user.account;

export default UserSlice.reducer;
