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
  game: null,
  version: 0,
  result: null,
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
      state.isPrivate = action.payload.isPrivate;
      history.pushState({}, null, `?lobbyID=${action.payload.lobbyID}`);
    },
    initiateClientGame(state, action) {
      state.result = null;
      state.lobby = action.payload;
      state.game = {
        grid: [null, null, null, null, null, null, null, null, null],
        curMove: "X",
        timeLimit: 10000,
        totalTime: 10000,
      };
      state.version++;
    },
    updateClientGame(state, action) {
      // If current made move exist return
      if (state.game.grid[action.payload]) return;

      const curMove = state.game.curMove;
      // Set grid move from player or robot
      state.game.grid[action.payload] = curMove;
      // Change current move to the opposite of prevCur
      state.game.curMove = curMove === "X" ? "O" : "X";
    },
    updateServerGame(state, action) {
      state.game = action.payload.game;
      state.version += 1;
    },
    updateTimeLimit(state, action) {
      state.game.timeLimit = action.payload;
    },
    updateTotalTime(state, action) {
      state.game.totalTime = action.payload;
    },
    updateResult(state, action) {
      state.result = action.payload;
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
      if (!state.lobby) {
        state.player1Move = action.payload.move;
      }
    },
  },
});

export default gameSlicer.reducer;

export const gameActions = gameSlicer.actions;
