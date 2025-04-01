import store from "../store/store.js";
import { gameActions } from "../store/gameSlicer";
import { audioRef } from "../components/AudioAndTitle/AudioAndTitle";
import { uiActions } from "../store/uiSlicer";
import startLobby from "./controllers/startLobby.js";
import switchMoves from "./controllers/switchMoves.js";
import joinLobby from "./controllers/joinLobby.js";
import updateUsername from "./controllers/updateUsername.js";

const webSocket = new WebSocket(import.meta.env.VITE_CONNECTION_URL);

webSocket.onopen = () => {
  store.dispatch(uiActions.webSocketIsConnecting(false));

  const lobbyID = window.location.pathname.slice(1);

  if (lobbyID) {
    store.dispatch(uiActions.isJoining(true));

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

webSocket.onclose = () => {
  console.log("handle server crash");
};
webSocket.onerror = () => {
  console.log("handle error of not joining");
};

export default webSocket;
