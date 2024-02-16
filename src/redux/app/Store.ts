import { configureStore } from '@reduxjs/toolkit';
import UserReducer, { UserContextI } from '../feature/userSlice';
import CachingDriverSlice, {
  CachingDriverI,
} from '../feature/cachingDriverSlice';

export type MainStoreI = {
  user: UserContextI | undefined;
  queryFetchLogs: CachingDriverI;
};

const store = configureStore({
  reducer: {
    user: UserReducer,
    queryFetchLogs: CachingDriverSlice,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch;
