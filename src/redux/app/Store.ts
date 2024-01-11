import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../feature/userSlice';

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch;
