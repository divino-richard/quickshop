import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../types/poduct.type';

interface CreateProductState {
  createdProduct: Product | null;
  error: {
    message: string | null;
  },
  loading: boolean;
}

const initialState: CreateProductState = {
    createdProduct: null,
    error: {
        message: null,
    },
    loading: false,
};

const createProductSlice = createSlice({
    name: 'createProduct',
    initialState,
    reducers: {
        productWasCreated(
            state: CreateProductState, 
            action: PayloadAction<Product>
        ) {
            state.createdProduct = action.payload;
        },
        createProductFailed(
            state: CreateProductState, 
            action: PayloadAction<string>
        ) {
            state.error.message = action.payload;
        },
        createProductLoading(
            state: CreateProductState,
            action: PayloadAction<boolean>
        ) {
            state.loading = action.payload
        },
    },
});

export const {
    productWasCreated,
    createProductFailed,
    createProductLoading,
} = createProductSlice.actions;

export default createProductSlice.reducer;
