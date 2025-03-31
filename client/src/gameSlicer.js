import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lobby: undefined,
  isPrivate: true,
  isAdmin: false,
  isConnecting: true,
  player1: null,
  player2: null,
  player1Move: "X",
  lobbyID: null,
  gameGrid: null,
};

const gameSlicer = createSlice({
  name: "game",
  initialState,
  reducers: {
    startLobbyClient(state, action) {
      state.lobby = null;
      state.isAdmin = action.payload.isAdmin;
      state.player1 = action.payload.player1;
      state.player1Move = action.payload.move;
      state.player2 = action.payload.player2;
      state.lobbyID = action.payload.lobbyID;
      history.pushState({}, null, state.lobbyID);
    },

    changePlayer1Username(state, action) {
      state.player1 = action.payload;
    },
    changePlayer2Username(state, action) {
      state.player2 = action.payload;
    },

    changePlayerMoves(state, action) {
      if (!state.gameGrid) {
        state.player1Move = action.payload.move;
      }
    },
  },
});

export default gameSlicer.reducer;

export const gameActions = gameSlicer.actions;
