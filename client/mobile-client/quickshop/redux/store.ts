import { configureStore } from '@reduxjs/toolkit';

// import authReducer from './slice/auth/auth.slice';
import getProductsReducer from './slice/product/getProducts.slice';
import getProductReducer from './slice/product/getProduct.slice';

export const store = configureStore({
  reducer: {
    // authentication: authReducer,
    getProducts: getProductsReducer,
    getProduct: getProductReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;