import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlicer.js";
import uiReducer from "./uiSlicer.js";

const store = configureStore({ reducer: { game: gameReducer, ui: uiReducer } });
export default store;
