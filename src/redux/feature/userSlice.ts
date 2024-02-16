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
import { ResponseCode } from '../../../FarmServiceApiTypes/Respnse/responseGeneric';
import { AddressResponseBase } from '../../../FarmServiceApiTypes/Address/Ressponses';

export enum InitializationStatus {
  PENDING,
  FULFILLED,
  REJECTED,
}

export type UserContextI = {
  role: UserRole | undefined;
  personal_data: Partial<UserResponseBase['personal_data']>;
  address: Partial<UserResponseBase['address']>;
  account: Partial<UserResponseBase['account']>;
  company?: Partial<{
    name: string;
    address: null | Partial<AddressResponseBase>;
    email: string;
    PhoneNumber: string;
    NIP: string;
  }>;
  initializationStatus: InitializationStatus;
};

export type UserSliceI = {
  user: UserContextI | undefined;
};

const initUserData: UserContextI = {
  role: undefined,
  personal_data: {
    name: undefined,
    surname: undefined,
    phoneNumber: undefined,
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
  company: undefined,
  initializationStatus: InitializationStatus.PENDING,
} as UserContextI;

export const setUpUser = createAsyncThunk('user/fetchUser', async () => {
  try {
    await Api.init();
    const response = await Api.me();
    console.log(response.payload, 'setUpUser');
    if (response.code === ResponseCode.ProcessedCorrect && response.payload)
      setThemeToStorage(response.payload.account.theme);
    return {
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
    };
  }
});

export const setUserAsync = createAsyncThunk(
  'user/setUserAsync',
  async (data: UserResponseBase) => {
    console.log(data.company, 'setUserAsync');
    await setThemeToStorage(data.account.theme);
    return { ...data };
  },
);

const UserSlice = createSlice({
  name: 'user',
  initialState: initUserData,
  extraReducers(builder) {
    builder.addCase(setUpUser.fulfilled, (state, action) => {
      state.initializationStatus = action.payload?.initializationStatus;
      state.role = action.payload?.role;
      if (action.payload?.account) state.account = action.payload.account;
      if (action.payload?.personal_data)
        state.personal_data = action.payload?.personal_data;
      if (action.payload?.address) state.address = action.payload?.address;
      if (action.payload?.company) state.company = action.payload?.company;
    });
    builder.addCase(setUserAsync.fulfilled, (state, action) => {
      state.role = action.payload.role;
      state.account = action.payload.account;
      state.address = action.payload.address;
    });
  },
  reducers: {
    setTheme: (state, value) => {
      state.account.theme = value.payload;
    },
    setCompany: (state, value) => {
      state.company = value.payload;
    },
  },
});

export const { setTheme, setCompany } = UserSlice.actions;

export const selectTheme = (state: UserSliceI) => state.user?.account.theme;
export const selectUserRole = (state: UserSliceI) => state.user?.role;
export const selectInitStatus = (state: UserSliceI) =>
  state.user?.initializationStatus;
export const selectUserPersonalData = (state: UserSliceI) =>
  state.user?.personal_data;
export const selectUserAddress = (state: UserSliceI) => state.user?.address;
export const selectUserAccount = (state: UserSliceI) => state.user?.account;
export const selectUserCompany = (state: UserSliceI) => state.user?.company;
export const selectUser = (state: UserSliceI) => state.user;

export default UserSlice.reducer;
