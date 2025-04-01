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
    webSocketIsConnecting(state, action) {
      state.isConnecting = action.payload;
    },
    isJoining(state, action) {
      state.isJoining = action.payload;
    },
    isSwitchingMoves(state, action) {
      state.isSwitchingMoves = action.payload;
    },
  },
});

export default uiSlicer.reducer;

export const uiActions = uiSlicer.actions;
