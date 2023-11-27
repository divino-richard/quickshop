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
    getProductsSuccess(state: GetProductsState, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    getProductsFailed(state: GetProductsState, action: PayloadAction<string>) {
      state.error.message = action.payload;
    },
    setLoading(state: GetProductsState, action: PayloadAction<boolean>){
      state.loading = action.payload;
    }
  },
});

export const {
  getProductsSuccess,
  getProductsFailed,
  setLoading,
} = getProductsSlice.actions;

export default getProductsSlice.reducer;
