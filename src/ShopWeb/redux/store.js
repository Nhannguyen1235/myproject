import { configureStore } from '@reduxjs/toolkit';
import sliderReducer from './sliderSlice';
import productReducer from './productSlice';
import scrollUpReducer from './scrollUpSlice';

export const store = configureStore({
  reducer: {
    slider: sliderReducer,
    products: productReducer,
    scrollUp: scrollUpReducer
  },
});

export default store;
