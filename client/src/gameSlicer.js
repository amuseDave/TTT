import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lobby: undefined,
  isPrivate: true,
  isAdmin: true,
  isConnecting: true,
};

const gameSlicer = createSlice({
  name: "game",
  initialState,
  reducers: {
    startLobbyClient(state) {
      state.lobby = null;
    },
    webSocketConnection(state, action) {
      state.isConnecting = action.payload;
    },
  },
});

export default gameSlicer.reducer;

export const gameActions = gameSlicer.actions;
