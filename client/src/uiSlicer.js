import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnecting: true,
  isSwitchingMoves: false,
};

const uiSlicer = createSlice({
  name: "ui",
  initialState,
  reducers: {
    webSocketConnection(state, action) {
      state.isConnecting = action.payload;
    },
    switchingMoves(state, action) {
      state.isSwitchingMoves = action.payload;
    },
  },
});

export default uiSlicer.reducer;

export const uiActions = uiSlicer.actions;
