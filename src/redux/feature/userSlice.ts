/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ColorSchemeName } from 'react-native';
import { UserResponseBase } from '../../../FarmServiceApiTypes/User/Responses';
import { UserRole } from '../../../FarmServiceApiTypes/User/Enums';
import { Api, ApiSelf } from '../../../api/Api';
import {
  getThemeFromStorage,
  setThemeToStorage,
} from '../../../helepers/ThemeHelpers';
import { ResponseCode } from '../../../FarmServiceApiTypes/Respnse/responseGeneric';
import { AddressResponseBase } from '../../../FarmServiceApiTypes/Address/Ressponses';
import { Theme } from '../../../FarmServiceApiTypes/Account/Constants';

export enum InitializationStatus {
  PENDING,
  FULFILLED,
  REJECTED,
}

export type UserContextI = {
  role: UserRole | undefined;
  personalData: Partial<UserResponseBase['personalData']>;
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
  personalData: {
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
    theme: Theme.dark,
    activationCode: undefined,
  },
  company: undefined,
  initializationStatus: InitializationStatus.PENDING,
} as UserContextI;

export const setUpUser = createAsyncThunk(
  'user/fetchUser',
  async (shameName: ColorSchemeName) => {
    try {
      await ApiSelf.init();
      const response = await Api.me();
      if (response.code === ResponseCode.ProcessedCorrect && response.payload)
        setThemeToStorage(response.payload.account.theme);
      // some data may be missing due to user role
      return {
        initializationStatus: InitializationStatus.FULFILLED,
        personalData: {
          name: response.payload.personalData.name,
          surname: response.payload.personalData.surname,
          phoneNumber: response.payload.personalData.phoneNumber,
        },
        address: {
          city: response.payload.address.city,
          county: response.payload.address.county,
          voivodeship: response.payload.address.voivodeship,
          postalCode: response.payload.address.postalCode,
          street: response.payload.address.street,
          houseNumber: response.payload.address.houseNumber,
          apartmentNumber: response.payload.address.apartmentNumber,
        },
        account: {
          email: response.payload.account.email,
          isActivated: response.payload.account.isActivated,
          theme: response.payload.account.theme,
        },
        company: response.payload.company
          ? {
              name: response.payload.company.name,
              address: response.payload.company.address,
              email: response.payload.company.email,
              PhoneNumber: response.payload.company?.phoneNumber,
              NIP: response.payload.company.NIP,
            }
          : undefined,
        role: response.payload.role,
        ...response.payload,
      };
    } catch (error) {
      console.info(error, "Couldn't fetch user in userSlice");
      return {
        ...initUserData,
        account: {
          theme:
            (await getThemeFromStorage()) || shameName === 'dark'
              ? Theme.dark
              : Theme.light,
        },
        initializationStatus: InitializationStatus.REJECTED,
      };
    }
  },
);

export const setUserAsync = createAsyncThunk(
  'user/setUserAsync',
  async (data: UserResponseBase) => {
    await setThemeToStorage(data.account.theme);
    return {
      ...data,
      personalData: {
        name: data.personalData.name,
        surname: data.personalData.surname,
        phoneNumber: data.personalData.phoneNumber,
      },
      address: { ...data.address },
      account: { ...data.account },
      company: { ...data.company },
    };
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
      if (action.payload?.personalData)
        state.personalData = action.payload?.personalData;
      if (action.payload?.address) state.address = action.payload?.address;
      if (action.payload?.company) state.company = action.payload?.company;
    });
    builder.addCase(setUserAsync.fulfilled, (state, action) => {
      if (action.payload.personalData)
        state.personalData = {
          name: action.payload.personalData.name,
          surname: action.payload.personalData.surname,
          phoneNumber: action.payload.personalData.phoneNumber,
        };
      if (action.payload.role) state.role = action.payload.role;
      if (action.payload.account)
        state.account = {
          theme: action.payload.account.theme,
        };
      if (action.payload.address)
        state.address = {
          city: action.payload.address.city,
          county: action.payload.address.county,
          voivodeship: action.payload.address.voivodeship,
          postalCode: action.payload.address.postalCode,
          street: action.payload.address.street,
          houseNumber: action.payload.address.houseNumber,
          apartmentNumber: action.payload.address.apartmentNumber,
        };
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
  state.user?.personalData;
export const selectUserAddress = (state: UserSliceI) => state.user?.address;
export const selectUserAccount = (state: UserSliceI) => state.user?.account;
export const selectUserCompany = (state: UserSliceI) => state.user?.company;
export const selectUser = (state: UserSliceI) => state.user;

export default UserSlice.reducer;
