import { createSlice } from '@reduxjs/toolkit';

type UserContextI = {
  theme: number;
};

export type UserSliceI = {
  user: UserContextI;
};

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    theme: 1,
  } as UserContextI,
  reducers: {
    setTheme: (state, value) => {
      // eslint-disable-next-line no-param-reassign
      state.theme = value.payload;
    },
  },
});

export const { setTheme } = UserSlice.actions;

export const selectTheme = (state: UserSliceI) => state.user.theme;

export default UserSlice.reducer;
