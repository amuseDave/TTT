import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnecting: true,
  isSwitchingMoves: false,
  isJoining: false,
};

const uiSlicer = createSlice({
  name: "ui",
  initialState,
  reducers: {
    webSocketConnection(state, action) {
      state.isConnecting = action.payload;
    },
    isSwitchingMoves(state, action) {
      state.isSwitchingMoves = action.payload;
    },
    isJoining(state, action) {
      state.isJoining = action.payload;
    },
  },
});

export default uiSlicer.reducer;

export const uiActions = uiSlicer.actions;
