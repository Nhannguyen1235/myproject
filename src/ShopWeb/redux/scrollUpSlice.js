import { createSlice } from "@reduxjs/toolkit";

const scrollUp = createSlice({
  name: 'scrollUp',
  initialState: {
    scrollUp: false,
  },
  reducers: {
    setScrollUp(state) {
      state.scrollUp = true;
    },
    hideScrollUp(state) {
      state.scrollUp = false;
    }
  }
});

export const { setScrollUp, hideScrollUp } = scrollUp.actions;
export default scrollUp.reducer;
