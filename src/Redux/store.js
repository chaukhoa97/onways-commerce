import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './items';
import authReducer from './auth';
import userReducer from './user';
import adminReducer from './admin';

const store = configureStore({
  reducer: {
    items: itemsReducer,
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
  },
});

export default store;
