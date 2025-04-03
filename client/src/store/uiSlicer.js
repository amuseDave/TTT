import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnectingServer: true,
  isConnectedServer: false,
  isCreatingLobby: false,
  isSwitchingMoves: false,
  isJoiningLobby: false,
  startError: null,
  isFindingLobby: false,
  menuAlert: { type: "", message: null },
};

const uiSlicer = createSlice({
  name: "ui",
  initialState,
  reducers: {
    isJoiningLobby(state, action) {
      state.isJoiningLobby = action.payload;
    },
    isFindingLobby(state, action) {
      state.isFindingLobby = action.payload;
    },
    isCreatingLobby(state, action) {
      state.isCreatingLobby = action.payload;
    },
    isConnectingServer(state, action) {
      state.isConnectingServer = action.payload;
    },
    isConnectedServer(state, action) {
      state.isConnectedServer = action.payload;
    },
    isSwitchingMoves(state, action) {
      state.isSwitchingMoves = action.payload;
    },
    setStartError(state, action) {
      state.startError = action.payload;
    },
    setMenuAlert(state, action) {
      state.menuAlert = action.payload;
    },
  },
});

export default uiSlicer.reducer;

export const uiActions = uiSlicer.actions;
