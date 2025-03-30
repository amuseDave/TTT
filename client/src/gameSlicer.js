import { createSlice } from "@reduxjs/toolkit";
import { getRandomItem, usernames } from "./utils";

const initialState = {
  lobby: undefined,
  isPrivate: true,
  isAdmin: true,
  isConnecting: true,
  player1: null,
  player2: null,
  player1Move: "X",
};

const gameSlicer = createSlice({
  name: "game",
  initialState,
  reducers: {
    startLobbyClient(state) {
      state.lobby = null;
      state.player1 = getRandomItem(usernames);
    },
    webSocketConnection(state, action) {
      state.isConnecting = action.payload;
    },
    changePlayer1Username(state, action) {
      state.player1 = action.payload;
    },
    changePlayer2Username(state, action) {
      state.player2 = action.payload;
    },

    changePlayerMoves(state) {
      state.player1Move = state.player1Move === "X" ? "O" : "X";
    },
  },
});

export default gameSlicer.reducer;

export const gameActions = gameSlicer.actions;
