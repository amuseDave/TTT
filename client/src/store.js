import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlicer.js";

const store = configureStore({ reducer: { game: gameReducer } });
export default store;
