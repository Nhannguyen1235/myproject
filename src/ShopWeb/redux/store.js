import { configureStore } from '@reduxjs/toolkit';
import sliderReducer from './slicederSlice';

export const store = configureStore({
  reducer: {
    slider: sliderReducer,
  },
});

export default store;
