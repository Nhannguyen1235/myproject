import { createSlice } from '@reduxjs/toolkit';

export const sliderSlice = createSlice({
  name: 'slider',
  initialState: {
    currentSlide: 0,
    totalSlides: 4,
  },
  reducers: {
    nextSlide: (state) => {
      state.currentSlide = (state.currentSlide + 1) % state.totalSlides;
    },
    prevSlide: (state) => {
      state.currentSlide = (state.currentSlide - 1 + state.totalSlides) % state.totalSlides;
    },
    setSlide: (state, action) => {
      state.currentSlide = action.payload;
    },
  },
});

export const { nextSlide, prevSlide, setSlide } = sliderSlice.actions;

export default sliderSlice.reducer;
