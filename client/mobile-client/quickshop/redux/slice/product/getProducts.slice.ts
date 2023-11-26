import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../types/product.types';

interface GetProductsState {
  products: Product[];
  error: {
    message: string | null;
  },
  loading: boolean,
}

const initialState: GetProductsState = {
  products: [],
  error: {
    message: null,
  },
  loading: false
};

const getProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductSuccess(state: GetProductsState, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    getProductFailed(state: GetProductsState, action: PayloadAction<string>) {
      state.error.message = action.payload;
    },
    setLoading(state: GetProductsState, action: PayloadAction<boolean>){
      state.loading = action.payload;
    }
  },
});

export const {
  getProductSuccess,
  getProductFailed,
  setLoading,
} = getProductsSlice.actions;

export default getProductsSlice.reducer;
