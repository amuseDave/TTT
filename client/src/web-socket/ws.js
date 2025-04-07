import store from "../store/store.js";
import { gameActions } from "../store/gameSlicer";
import { audioRef } from "../components/Static/AudioAndTitle/AudioAndTitle";
import { uiActions } from "../store/uiSlicer";
import startLobby from "./controllers/startLobby.js";
import switchMoves from "./controllers/switchMoves.js";
import joinLobby from "./controllers/joinLobby.js";
import updateUsername from "./controllers/updateUsername.js";
import onClose from "./controllers/onClose.js";
import onError from "./controllers/onError.js";
import displayAlerts from "./controllers/displayAlerts.js";
import togglePrivacy from "./controllers/togglePrivacy.js";
import startGame from "./controllers/startGame.js";
import updateGame from "./controllers/updateGame.js";
import skipTurn from "./controllers/skipTurn.js";
import updateTime from "./controllers/updateTime.js";
import resetGame from "./controllers/resetGame.js";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
export const lobbyID = params.get("lobbyID");

let webSocket = new WebSocket("http://localhost:8080");
initializeEvents();

// Initialize web socket event on every new connection
function initializeEvents() {
  webSocket.onopen = () => {
    // Update ui that server is connected
    store.dispatch(uiActions.isConnectingServer(false));
    store.dispatch(uiActions.isConnectedServer(true));

    // Join lobby if lobbyID is present in URL and user is joining lobby has state to true
    if (store.getState().ui.isJoiningLobby && lobbyID) {
      // Test out delay UI
      setTimeout(() => {
        webSocket.send(JSON.stringify({ action: "join-lobby", data: { lobbyID } }));
      }, 2000);
    }

    // Handle incoming messages from the server to update the UI & GAME states
    webSocket.onmessage = async (event) => {
      const { action, data, type } = JSON.parse(event.data);
      console.log("Action: ", action, "Data: ", data, "Type: ", type);
      const argObj = { data, store, gameActions, uiActions, type, audioRef };

      if (action === "update-username") updateUsername(argObj);
      else if (action === "update-game") updateGame(argObj);
      else if (action === "switch-moves") switchMoves(argObj);
      else if (action === "display-alert") displayAlerts(argObj);
      else if (action === "skip-turn") skipTurn(argObj);
      else if (action === "update-time") updateTime(argObj);
      else if (action === "toggle-privacy") togglePrivacy(argObj);
      else if (action === "start-lobby") startLobby(argObj);
      else if (action === "join-lobby") joinLobby(argObj);
      else if (action === "start-game") startGame(argObj);
      else if (action === "reset-game") resetGame(argObj);
      else if (action === "error") console.log(data.msg);
    };
  };

  // Handle close and error events
  webSocket.onclose = (e) => {
    onClose(e, { store, gameActions, uiActions });
  };
  // Handle  error events
  webSocket.onerror = () => {
    onError({ store, gameActions, uiActions });
  };
}

// Reconnect to the WebSocket server
export function reconnectWebSocket() {
  webSocket = new WebSocket("http://localhost:8080");
  store.dispatch(uiActions.isConnectingServer(true));
  initializeEvents();
}

export default function getWebSocket() {
  return webSocket;
}
