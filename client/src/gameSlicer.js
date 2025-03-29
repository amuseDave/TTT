import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lobby: undefined,
  isPrivate: true,
  isAdmin: true,
};

const gameSlicer = createSlice({
  name: "game",
  initialState,
  reducers: {
    startLobbyClient(state) {
      state.lobby = null;
    },
  },
});

export default gameSlicer.reducer;

export const gameActions = gameSlicer.actions;
