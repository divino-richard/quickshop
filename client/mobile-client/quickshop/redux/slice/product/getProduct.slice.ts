import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../types/product.types';

interface GetProductState {
  product: Product | null;
  error: {
    message: string | null;
  },
  loading: boolean,
}

const initialState: GetProductState = {
  product: null,
  error: {
    message: null,
  },
  loading: false
};

const getProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductSuccess(state: GetProductState, action: PayloadAction<Product>) {
      state.product = action.payload;
    },
    getProductFailed(state: GetProductState, action: PayloadAction<string>) {
      state.error.message = action.payload;
    },
    getProductLoading(state: GetProductState, action: PayloadAction<boolean>){
      state.loading = action.payload;
    }
  },
});

export const {
  getProductSuccess,
  getProductFailed,
  getProductLoading,
} = getProductSlice.actions;

export default getProductSlice.reducer;
