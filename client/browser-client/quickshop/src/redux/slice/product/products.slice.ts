import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../types/poduct.type';

interface ProductsState {
  products: Product[] | null;
  error: {
    message: string | null;
  }
}

const initialState: ProductsState = {
  products: null,
  error: {
    message: null
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    gotProducts(state: ProductsState, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    getProductsFailed(state: ProductsState, action: PayloadAction<string>) {
      state.error.message = action.payload;
    }
  },
});

export const {
  gotProducts,
  getProductsFailed,
} = productsSlice.actions;

export default productsSlice.reducer;
