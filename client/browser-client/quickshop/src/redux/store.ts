import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slice/auth/auth.slice';
import productReducer from './slice/product/products.slice';
import createProductReducer from './slice/product/createProduct.slice';

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    products: productReducer,
    createProduct: createProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;