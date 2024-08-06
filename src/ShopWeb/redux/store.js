import { configureStore } from '@reduxjs/toolkit';
import sliderReducer from './sliderSlice';
import productReducer from './productSlice';

export const store = configureStore({
  reducer: {
    slider: sliderReducer,
    products: productReducer
  },
});

export default store;
