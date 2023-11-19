import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slice/auth/auth.slice';
import productReducer from './slice/product/products.slice';

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    products: productReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;