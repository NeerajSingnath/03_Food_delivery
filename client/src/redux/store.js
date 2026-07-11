import { configureStore } from '@reduxjs/toolkit';
import ownerReducer from './owner.slice';
import userReducer from './user.slice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    owner: ownerReducer,
  },
});
