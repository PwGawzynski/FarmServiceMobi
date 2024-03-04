import { configureStore } from '@reduxjs/toolkit';
import UserReducer, { UserContextI } from '../feature/userSlice';
import CachingDriverSlice, {
  CachingDriverI,
} from '../feature/cachingDriverSlice';
import WorkerSlice, { WorkerSliceI } from '../feature/workerSlice';

export type MainStoreI = {
  user: UserContextI | undefined;
  queryFetchLogs: CachingDriverI;
  worker: WorkerSliceI;
};

const store = configureStore({
  reducer: {
    user: UserReducer,
    queryFetchLogs: CachingDriverSlice,
    worker: WorkerSlice,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch;
