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
  reducers: {},
});

export const selectTheme = (state: UserSliceI) => state.user.theme;

export default UserSlice.reducer;
