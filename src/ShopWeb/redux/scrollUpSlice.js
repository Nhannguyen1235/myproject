import { createSlice } from '@reduxjs/toolkit';

const scrollUpSlice = createSlice({
  name: 'scrollUp',
  initialState: {
    showScrollTopButton: false,
  },
  reducers: {
    showScrollTopButton: (state) => {
      state.showScrollTopButton = true;
    },
    hideScrollTopButton: (state) => {
      state.showScrollTopButton = false;
    },
  },
});

export const { showScrollTopButton, hideScrollTopButton } = scrollUpSlice.actions;
export default scrollUpSlice.reducer;
