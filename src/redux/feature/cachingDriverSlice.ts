import { createSlice } from '@reduxjs/toolkit';
import { MainStoreI } from '../app/Store';

export interface CachingDriverI {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryFetchLogs: Array<{ key: string; value: any }>;
}

const initialState: CachingDriverI = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryFetchLogs: [],
};

const CachingDriverSlice = createSlice({
  name: 'cachingDriver',
  initialState,
  reducers: {
    setQueryFetchLogs: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.queryFetchLogs = [
        ...state.queryFetchLogs.filter(log => log.key !== action.payload.key),
        action.payload,
      ];
    },
    removeQueryFetchLogs: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.queryFetchLogs = state.queryFetchLogs.filter(
        log => log.key !== action.payload,
      );
    },
  },
});
export const { setQueryFetchLogs, removeQueryFetchLogs } =
  CachingDriverSlice.actions;
export const selectQueryFetchLog = (key: string) => (state: MainStoreI) => {
  return state.queryFetchLogs.queryFetchLogs.find(log => log.key === key);
};
export default CachingDriverSlice.reducer;
