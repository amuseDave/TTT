import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlicer.js";

const store = configureStore({ reducer: { ui: uiReducer } });
export default store;
