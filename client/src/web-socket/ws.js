import store from "../store/store.js";
import { gameActions } from "../store/gameSlicer";
import { audioRef } from "../components/AudioAndTitle/AudioAndTitle";
import { uiActions } from "../store/uiSlicer";
import startLobby from "./controllers/startLobby.js";
import switchMoves from "./controllers/switchMoves.js";
import joinLobby from "./controllers/joinLobby.js";
import updateUsername from "./controllers/updateUsername.js";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
export const lobbyID = params.get("lobbyID");

let webSocket = new WebSocket(import.meta.env.VITE_CONNECTION_URL);

webSocket.onopen = () => {
  store.dispatch(uiActions.isConnectingServer(false));
  store.dispatch(uiActions.isConnectedServer(true));
  if (lobbyID) {
    // Test out delay UI
    setTimeout(() => {
      webSocket.send(JSON.stringify({ action: "join-lobby", data: { lobbyID } }));
    }, 2000);
  }

  webSocket.onmessage = async (event) => {
    const { action, data, type } = JSON.parse(event.data);
    console.log("Action: ", action, "Data: ", data, "Type: ", type);

    const argObj = { data, store, gameActions, uiActions, type, audioRef };

    if (action === "update-username") updateUsername(argObj);
    else if (action === "switch-moves") switchMoves(argObj);
    else if (action === "start-lobby") startLobby(argObj);
    else if (action === "join-lobby") joinLobby(argObj);
  };
};

webSocket.onclose = (err) => {
  console.log(err);
  console.log("On Close event");

  const { isConnectedServer } = store.getState().ui;

  if (isConnectedServer) store.dispatch(uiActions.isConnectedServer(false));
};

webSocket.onerror = (err) => {
  console.log("On error event");

  const { isJoiningLobby, isConnectingServer } = store.getState().ui;

  if (isConnectingServer) store.dispatch(uiActions.isConnectingServer(false));
  if (isJoiningLobby) {
    history.pushState({}, null, "/");
    store.dispatch(uiActions.isJoiningLobby(false));
    store.dispatch(uiActions.setStartError("Couldn't Connect To the Server"));
  }
};

export default webSocket;
