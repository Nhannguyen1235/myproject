import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://66a07af87053166bcabb8822.mockapi.io/product';

// Create a thunk to fetch data from the API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get(url);
    return response.data;
});

const initialState = {
    products: [],
    status: 'idle',
    error: '',
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;
