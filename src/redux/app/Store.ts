import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../feature/userSlice';

export default configureStore({
  reducer: {
    user: UserReducer,
  },
});
console.log('dnis');
