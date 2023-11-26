import { configureStore } from '@reduxjs/toolkit';

// import authReducer from './slice/auth/auth.slice';
import getProductReducer from './slice/product/getProducts.slice';

export const store = configureStore({
  reducer: {
    // authentication: authReducer,
    getProducts: getProductReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;