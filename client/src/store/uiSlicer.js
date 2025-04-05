import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnectingServer: true,
  isConnectedServer: false,
  isCreatingLobby: false,
  isSwitchingMoves: false,
  isJoiningLobby: false,
  isPrivacyLoading: false,
  isFindingLobby: false,
  isStartingGame: false,
  startError: null,
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
    isPrivacyLoading(state, action) {
      state.isPrivacyLoading = action.payload;
    },
    isStartingGame(state, action) {
      state.isStartingGame = action.payload;
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
