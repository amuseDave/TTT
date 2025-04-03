import { createSlice } from "@reduxjs/toolkit";
import { getRandomItem, usernames } from "../utils/utils";

const initialState = {
  lobby: undefined,
  isPrivate: true,
  isAdmin: false,
  player1: getRandomItem(usernames),
  player2: null,
  player1Move: "X",
  lobbyID: null,
  gameGrid: null,
};

const gameSlicer = createSlice({
  name: "game",
  initialState,
  reducers: {
    initiateLobbyClient(state, action) {
      state.lobby = null;
      state.isAdmin = action.payload.isAdmin;
      if (state.player1 !== action.payload.player1) {
        state.player1 = action.payload.player1 ? action.payload.player1 : state.player1;
      }

      state.player1Move = action.payload.move;
      state.player2 = action.payload.player2;
      state.lobbyID = action.payload.lobbyID;
      history.pushState({}, null, `?lobbyID=${action.payload.lobbyID}`);
    },
    changePrivacy(state, action) {
      state.isPrivate = action.payload;
    },
    changeAdmin(state, action) {
      state.isAdmin = action.payload;
    },
    changePlayer1Username(state, action) {
      state.player1 = action.payload;
    },
    changePlayer2Username(state, action) {
      if (action.payload === null) state.isAdmin = true;
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
