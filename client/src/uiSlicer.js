import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: false,
};

const uiSlicer = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
    },
  },
});

export default uiSlicer.reducer;

export const uiActions = uiSlicer.actions;
